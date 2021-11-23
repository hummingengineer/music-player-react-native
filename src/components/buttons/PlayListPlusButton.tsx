import React, {useState, useCallback} from 'react';
import type {FC} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
} from 'react-native-track-player';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {IconButton} from './IconButton';
import type {UtilIconButtonProps, Track} from '../../types';

const PlayListPlusButton: FC<UtilIconButtonProps> = React.memo(({...props}) => {
  const [isPlayListItem, setIsPlayListItem] = useState(false);

  const fetchPlaylist = useCallback(async () => {
    const currentTrack = await TrackPlayer.getTrack(
      await TrackPlayer.getCurrentTrack(),
    );

    const jsonValue = await AsyncStorage.getItem('playlist');

    if (jsonValue) {
      const playlists: Track[] = JSON.parse(jsonValue);

      if (playlists.some(track => track.url === currentTrack.url))
        setIsPlayListItem(true);
      else setIsPlayListItem(false);
    }
  }, []);

  const handlePress = useCallback(async () => {
    const currentTrack = await TrackPlayer.getTrack(
      await TrackPlayer.getCurrentTrack(),
    );

    const jsonValue = await AsyncStorage.getItem('playlist');

    if (jsonValue) {
      const playListItems: Track[] = JSON.parse(jsonValue);

      if (isPlayListItem) {
        await AsyncStorage.setItem(
          'playlist',
          JSON.stringify(
            playListItems.filter(track => track.url !== currentTrack.url),
          ),
        );

        setIsPlayListItem(false);
      } else {
        await AsyncStorage.setItem(
          'playlist',
          JSON.stringify([...playListItems, currentTrack]),
        );

        setIsPlayListItem(true);
      }
    }
  }, [isPlayListItem]);

  const handleIcon = useCallback(() => {
    if (isPlayListItem) return 'playlist-minus';
    else return 'playlist-plus';
  }, [isPlayListItem]);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], event => {
    if (event.type === Event.PlaybackTrackChanged) {
      fetchPlaylist();
    }
  });

  useFocusEffect(
    useCallback(() => {
      fetchPlaylist();
    }, []),
  );

  return (
    <IconButton
      touchableOpacityProps={{onPress: handlePress}}
      iconProps={{name: handleIcon(), ...props}}
    />
  );
});

export {PlayListPlusButton};
