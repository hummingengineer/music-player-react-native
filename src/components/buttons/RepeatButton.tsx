import React, {useState, useCallback} from 'react';
import type {FC} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import TrackPlayer, {
  RepeatMode,
  useTrackPlayerEvents,
  Event,
} from 'react-native-track-player';

import {IconButton} from './IconButton';
import type {UtilIconButtonProps} from '../../types';

const RepeatButton: FC<UtilIconButtonProps> = React.memo(({...props}) => {
  const [mode, setMode] = useState<RepeatMode>(RepeatMode.Off);

  const fetchRepeat = useCallback(async () => {
    const mode = await TrackPlayer.getRepeatMode();
    setMode(mode);
  }, []);

  const handlePress = useCallback(async () => {
    switch (mode) {
      case RepeatMode.Off: {
        await TrackPlayer.setRepeatMode(RepeatMode.Track);
        setMode(RepeatMode.Track);
        break;
      }
      case RepeatMode.Track: {
        await TrackPlayer.setRepeatMode(RepeatMode.Queue);
        setMode(RepeatMode.Queue);
        break;
      }
      case RepeatMode.Queue: {
        await TrackPlayer.setRepeatMode(RepeatMode.Off);
        setMode(RepeatMode.Off);
        break;
      }
      default:
        await TrackPlayer.setRepeatMode(RepeatMode.Track);
        setMode(RepeatMode.Off);
        break;
    }
  }, [mode]);

  const handleIcon = useCallback(() => {
    switch (mode) {
      case RepeatMode.Off:
        return 'repeat-off';
      case RepeatMode.Track:
        return 'repeat-once';
      case RepeatMode.Queue:
        return 'repeat';
      default:
        return 'repeat-off';
    }
  }, [mode]);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], event => {
    if (event.type === Event.PlaybackTrackChanged) {
      fetchRepeat();
    }
  });

  useFocusEffect(
    useCallback(() => {
      fetchRepeat();
    }, []),
  );

  return (
    <IconButton
      touchableOpacityProps={{onPress: handlePress}}
      iconProps={{name: handleIcon(), ...props}}
    />
  );
});

export {RepeatButton};
