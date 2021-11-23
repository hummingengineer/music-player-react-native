import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TrackPlayer, {Capability} from 'react-native-track-player';
import AsyncStorage from '@react-native-async-storage/async-storage';

import type {RootStackParamList} from './src/types';
import {LibraryScreen, PlayerScreen} from './src/screens';
import {requestPermissions} from './src/utils';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  useEffect(() => {
    const setup = async () => {
      // To handle the issue related with react native reanimated library.
      LogBox.ignoreLogs(['new NativeEventEmitter']);

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

      // if app does not have like and playlist items, initialize them.
      if (!(await AsyncStorage.getItem('likes'))) {
        await AsyncStorage.setItem('likes', JSON.stringify([]));
      }
      if (!(await AsyncStorage.getItem('playlist'))) {
        await AsyncStorage.setItem('playlist', JSON.stringify([]));
      }
    };

    setup();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Library">
          <RootStack.Group>
            <RootStack.Screen
              name="Library"
              component={LibraryScreen}
              options={{title: 'Library', headerTitleAlign: 'center'}}
            />
            <RootStack.Screen
              name="Player"
              component={PlayerScreen}
              options={{headerShown: false}}
            />
          </RootStack.Group>
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
