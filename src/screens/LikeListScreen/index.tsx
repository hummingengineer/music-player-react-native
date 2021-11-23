import React, {useState, useCallback} from 'react';
import {StyleSheet, FlatList, View, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNFS from 'react-native-fs';

import type {Track} from '../../types';
import {ListItem, ListItemSeparator} from '../../components';

export function LikeListScreen() {
  const [likes, setLikes] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLikes = useCallback(async () => {
    const jsonValue = await AsyncStorage.getItem('likes');

    if (jsonValue) {
      const likes: Track[] = JSON.parse(jsonValue);

      const filesExist = await Promise.all(
        likes.map(track => RNFS.exists(track.url + '')),
      );

      const likesExist = likes.filter((_, idx) => filesExist[idx]);

      await AsyncStorage.setItem('likes', JSON.stringify(likesExist));

      setLikes(likesExist);
    }

    setIsLoading(false);
  }, []);

  const renderItem = useCallback(({item}) => <ListItem item={item} />, []);
  const keyExtractor = useCallback(item => item.url, []);
  const ItemSeparatorComponent = useCallback(() => <ListItemSeparator />, []);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      fetchLikes();
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
          data={likes}
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
