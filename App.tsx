import React, {useEffect} from 'react';
import TrackPlayer, {Capability} from 'react-native-track-player';

import {requestPermissions} from './src/utils';

export default function App() {
  useEffect(() => {
    const setup = async () => {
      await requestPermissions();

      // if app was relaunched and music was already playing, we don't setup again.
      if ((await TrackPlayer.getCurrentTrack()) !== null) return;

      await TrackPlayer.setupPlayer({});
      await TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.Stop,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
      });
    };

    setup();
  }, []);

  return <></>;
}
