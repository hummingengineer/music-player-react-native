import React, {useState, useCallback} from 'react';
import {StyleSheet, ImageBackground} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
} from 'react-native-track-player';

export function Thumbnail() {
  const [img, setImg] = useState(
    require('../../assets/images/default_artwork.png'),
  );

  const fetchImg = useCallback(async () => {
    const idx = await TrackPlayer.getCurrentTrack();
    const track = await TrackPlayer.getTrack(idx);

    if (track.artwork) setImg({uri: track.artwork});
    else setImg(require('../../assets/images/default_artwork.png'));
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], event => {
    if (event.type === Event.PlaybackTrackChanged) {
      fetchImg();
    }
  });

  useFocusEffect(
    useCallback(() => {
      fetchImg();
    }, []),
  );

  return <ImageBackground style={styles.image} source={img} />;
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});
