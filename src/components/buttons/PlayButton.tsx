import React, {useCallback} from 'react';
import type {FC} from 'react';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';

import {IconButton} from './IconButton';
import type {UtilIconButtonProps} from '../../types';

const PlayButton: FC<UtilIconButtonProps> = React.memo(({...props}) => {
  const playerState = usePlaybackState();

  const handlePress = useCallback(async () => {
    switch (playerState) {
      case State.Playing:
        await TrackPlayer.pause();
        break;
      default:
        await TrackPlayer.play();
        break;
    }
  }, [playerState]);

  const handleIcon = useCallback(() => {
    switch (playerState) {
      case State.Playing:
        return 'pause';
      default:
        return 'play';
    }
  }, [playerState]);

  return (
    <IconButton
      touchableOpacityProps={{onPress: handlePress}}
      iconProps={{name: handleIcon(), ...props}}
    />
  );
});

export {PlayButton};
