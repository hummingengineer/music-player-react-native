import React, {useState, useCallback} from 'react';
import type {FC, ComponentProps} from 'react';
import {Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
} from 'react-native-track-player';

type TextProps = ComponentProps<typeof Text>;

const Title: FC<TextProps> = React.memo(({...props}) => {
  const [name, setName] = useState<string>('unknown');

  const fetchTitle = useCallback(async () => {
    const idx = await TrackPlayer.getCurrentTrack();
    const track = await TrackPlayer.getTrack(idx);

    if (track.title) setName(track.title);
    else setName('unknown');
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], event => {
    if (event.type === Event.PlaybackTrackChanged) {
      fetchTitle();
    }
  });

  useFocusEffect(
    useCallback(() => {
      fetchTitle();
    }, []),
  );

  return (
    <Text {...props} numberOfLines={1} ellipsizeMode="tail">
      {name}
    </Text>
  );
});

export {Title};
