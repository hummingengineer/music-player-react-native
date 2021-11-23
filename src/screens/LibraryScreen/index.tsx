import React, {useEffect, useCallback} from 'react';
import {Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {LikeListScreen, TrackListScreen, PlayListScreen} from '../../screens';
import {NavigationProps} from '../../types';

const Tab = createMaterialTopTabNavigator();

export function LibraryScreen() {
  const navigation = useNavigation<NavigationProps>();

  const handleUrl = useCallback(data => {
    if (data.url === 'trackplayer://notification.click')
      navigation.navigate('Player');
  }, []);

  useEffect(() => {
    // Deep Linking
    Linking.getInitialURL().then(url => handleUrl({url: url}));
    Linking.addEventListener('url', handleUrl);
  }, []);

  return (
    <Tab.Navigator initialRouteName="LikeList">
      <Tab.Screen
        name="LikeList"
        component={LikeListScreen}
        options={{title: 'Likes'}}
      />
      <Tab.Screen
        name="TrackList"
        component={TrackListScreen}
        options={{title: 'Tracks'}}
      />
      <Tab.Screen
        name="PlayList"
        component={PlayListScreen}
        options={{title: 'Playlist'}}
      />
    </Tab.Navigator>
  );
}
