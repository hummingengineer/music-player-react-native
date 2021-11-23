import React, {useState, useCallback} from 'react';
import type {FC, ComponentProps} from 'react';
import {Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
} from 'react-native-track-player';

type TextProps = ComponentProps<typeof Text>;

const Artist: FC<TextProps> = React.memo(({...props}) => {
  const [name, setName] = useState<string>('unknown');

  const fetchArtist = useCallback(async () => {
    const idx = await TrackPlayer.getCurrentTrack();
    const track = await TrackPlayer.getTrack(idx);

    if (track.artist) setName(track.artist);
    else setName('unknown');
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], event => {
    if (event.type === Event.PlaybackTrackChanged) {
      fetchArtist();
    }
  });

  useFocusEffect(
    useCallback(() => {
      fetchArtist();
    }, []),
  );

  return (
    <Text {...props} numberOfLines={1} ellipsizeMode="tail">
      {name}
    </Text>
  );
});

export {Artist};
