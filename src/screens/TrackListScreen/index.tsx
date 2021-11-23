import React, {useState, useCallback} from 'react';
import {StyleSheet, FlatList, View, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';
// @ts-expect-error
import MusicFiles from 'react-native-get-music-files';

import type {Local, Track} from '../../types';
import {ListItem, ListItemSeparator} from '../../components';

export function TrackListScreen() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLocalTracks = useCallback(async () => {
    const locals: Local[] = await MusicFiles.getAll({
      blured: false, // works only when 'cover' is set to true
      artist: true,
      duration: true, // default : true
      cover: true, // default : true,
      genre: true,
      title: true,
      // minimumSongDuration: 10000, // get songs bigger than 10000 miliseconds duration,
      fields: ['title', 'albumTitle', 'genre', 'lyrics', 'artwork', 'duration'], // for iOs Version
    });

    const tracks: Track[] = locals.map(local => ({
      id: local.id ? local.id : undefined,
      url: local.path,
      duration: Number(local.duration) / 1000,
      title: local.title
        ? local.title
        : local.fileName.substr(0, local.fileName.lastIndexOf('.')),
      artist: local.author ? local.author : undefined,
      album: local.album ? local.album : undefined,
      genre: local.genre ? local.genre : undefined,
      artwork: local.cover ? local.cover : undefined,
    }));

    setTracks(tracks);

    setIsLoading(false);
  }, []); // You don't need to add setTracks to dependency list.
  const renderItem = useCallback(({item}) => <ListItem item={item} />, []);
  const keyExtractor = useCallback(item => item.url, []);
  const ItemSeparatorComponent = useCallback(() => <ListItemSeparator />, []);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      fetchLocalTracks();
    }, []),
  );

  return (
    <SafeAreaView style={styles.root}>
      {isLoading ? (
        <View style={styles.indicator}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={tracks}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={ItemSeparatorComponent}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
