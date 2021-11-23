import React, {useState, useCallback} from 'react';
import {
  Dimensions,
  StyleSheet,
  FlatList,
  View,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNFS from 'react-native-fs';

import type {Track} from '../../types';
import {
  ListItem,
  ListItemSeparator,
  PlayListPlayButton,
} from '../../components';

const {width} = Dimensions.get('window');

export function PlayListScreen() {
  const [playListItems, setPlayListItems] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPlayListItems = useCallback(async () => {
    const jsonValue = await AsyncStorage.getItem('playlist');

    if (jsonValue) {
      const playListItems: Track[] = JSON.parse(jsonValue);

      const filesExist = await Promise.all(
        playListItems.map(track => RNFS.exists(track.url + '')),
      );

      const playListItemsExist = playListItems.filter(
        (_, idx) => filesExist[idx],
      );

      await AsyncStorage.setItem(
        'playlist',
        JSON.stringify(playListItemsExist),
      );

      setPlayListItems(playListItemsExist);
    }

    setIsLoading(false);
  }, []);

  const renderItem = useCallback(({item}) => <ListItem item={item} />, []);
  const keyExtractor = useCallback(item => item.url, []);
  const ItemSeparatorComponent = useCallback(() => <ListItemSeparator />, []);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      fetchPlayListItems();
    }, []),
  );

  return (
    <>
      <SafeAreaView style={styles.root}>
        {isLoading ? (
          <View style={styles.indicator}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            data={playListItems}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={ItemSeparatorComponent}
          />
        )}
      </SafeAreaView>
      <View style={styles.fab}>
        <PlayListPlayButton size={width / 10} color="white" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    backgroundColor: 'mediumpurple',
    position: 'absolute',
    right: width / 15,
    bottom: width / 15,
    padding: 10,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
