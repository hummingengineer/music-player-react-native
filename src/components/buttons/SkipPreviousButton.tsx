import React, {useCallback} from 'react';
import type {FC} from 'react';
import TrackPlayer from 'react-native-track-player';

import {IconButton} from './IconButton';
import type {UtilIconButtonProps} from '../../types';

const SkipPreviousButton: FC<UtilIconButtonProps> = React.memo(({...props}) => {
  const handlePress = useCallback(async () => {
    try {
      await TrackPlayer.skipToPrevious();
    } catch {
      // Error: There is no tracks left to play
      await TrackPlayer.seekTo(0);
    }
  }, []);

  return (
    <IconButton
      touchableOpacityProps={{onPress: handlePress}}
      iconProps={{name: 'skip-previous', ...props}}
    />
  );
});

export {SkipPreviousButton};
