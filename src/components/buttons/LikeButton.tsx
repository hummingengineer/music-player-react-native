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

const LikeButton: FC<UtilIconButtonProps> = React.memo(({...props}) => {
  const [isLike, setLike] = useState(false);

  const fetchLike = useCallback(async () => {
    const currentTrack = await TrackPlayer.getTrack(
      await TrackPlayer.getCurrentTrack(),
    );

    const jsonValue = await AsyncStorage.getItem('likes');

    if (jsonValue) {
      const likes: Track[] = JSON.parse(jsonValue);

      if (likes.some(track => track.url === currentTrack.url)) setLike(true);
      else setLike(false);
    }
  }, []);

  const handlePress = useCallback(async () => {
    const currentTrack = await TrackPlayer.getTrack(
      await TrackPlayer.getCurrentTrack(),
    );

    const jsonValue = await AsyncStorage.getItem('likes');

    if (jsonValue) {
      if (isLike) {
        const likes: Track[] = JSON.parse(jsonValue);

        await AsyncStorage.setItem(
          'likes',
          JSON.stringify(likes.filter(track => track.url !== currentTrack.url)),
        );

        setLike(false);
      } else {
        const likes: Track[] = JSON.parse(jsonValue);

        await AsyncStorage.setItem(
          'likes',
          JSON.stringify([...likes, currentTrack]),
        );

        setLike(true);
      }
    }
  }, [isLike]);

  const handleIcon = useCallback(() => {
    if (isLike) return 'heart';
    else return 'heart-outline';
  }, [isLike]);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], event => {
    if (event.type === Event.PlaybackTrackChanged) {
      fetchLike();
    }
  });

  useFocusEffect(
    useCallback(() => {
      fetchLike();
    }, []),
  );

  return (
    <IconButton
      touchableOpacityProps={{onPress: handlePress}}
      iconProps={{
        name: handleIcon(),
        ...props,
        color: isLike ? 'red' : props.color,
      }}
    />
  );
});

export {LikeButton};
