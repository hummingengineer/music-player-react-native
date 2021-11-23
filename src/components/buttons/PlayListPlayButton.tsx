import React, {useCallback} from 'react';
import type {FC} from 'react';
import {useNavigation} from '@react-navigation/native';
import TrackPlayer, {RepeatMode} from 'react-native-track-player';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {IconButton} from './IconButton';
import type {UtilIconButtonProps, NavigationProps, Track} from '../../types';

const PlayListPlayButton: FC<UtilIconButtonProps> = React.memo(({...props}) => {
  const navigation = useNavigation<NavigationProps>();

  const handlePress = useCallback(async () => {
    const jsonValue = await AsyncStorage.getItem('playlist');

    if (jsonValue) {
      const playListItems: Track[] = JSON.parse(jsonValue);

      await TrackPlayer.reset();
      await TrackPlayer.add(playListItems);
      await TrackPlayer.play();
      await TrackPlayer.setRepeatMode(RepeatMode.Queue);
      navigation.navigate('Player');
    }
  }, []);

  return (
    <IconButton
      touchableOpacityProps={{onPress: handlePress}}
      iconProps={{name: 'playlist-play', ...props}}
    />
  );
});

export {PlayListPlayButton};
