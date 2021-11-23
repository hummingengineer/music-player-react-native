import React, {useCallback} from 'react';
import type {FC} from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  Text,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import TrackPlayer from 'react-native-track-player';

import type {Track, NavigationProps} from '../../types';
import {secondsToHHMMSS as converter} from '../../utils';

const {width} = Dimensions.get('window');

const ListItem: FC<{item: Track}> = React.memo(
  ({item}) => {
    const {colors} = useTheme();
    const navigation = useNavigation<NavigationProps>();

    const secondsToHHMMSS = useCallback(converter, []);
    const handlePress = useCallback(async () => {
      await TrackPlayer.reset();
      await TrackPlayer.add(item);
      await TrackPlayer.play();
      navigation.navigate('Player');
    }, [item]);

    return (
      <TouchableOpacity onPress={handlePress}>
        <View style={[styles.item, {backgroundColor: colors.card}]}>
          <View style={styles.thumbnail}>
            <ImageBackground
              style={styles.image}
              source={
                item.artwork
                  ? {uri: item.artwork}
                  : require('../../assets/images/default_track_icon.png')
              }
            />
          </View>
          <View style={styles.details}>
            <Text style={[styles.title, {color: colors.text}]}>
              {item.title ? item.title : 'unknown'}
            </Text>
            <Text style={[styles.author, {color: colors.text, opacity: 0.5}]}>
              {item.artist ? item.artist : 'unknown'}
            </Text>
          </View>
          <View style={styles.duration}>
            <Text>
              {item.duration ? secondsToHHMMSS(item.duration) : '?:??'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  },
  (prevProps, nextProps) => prevProps.item.url === nextProps.item.url,
);

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  thumbnail: {
    height: width / 12,
    width: width / 12,
    marginRight: 2,
  },
  image: {
    flex: 1,
  },
  details: {
    flex: 1,
    margin: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: width / 25.7,
  },
  author: {
    fontSize: width / 30,
  },
  duration: {
    marginRight: 10,
  },
});

export {ListItem};
