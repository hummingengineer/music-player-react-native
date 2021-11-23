import React from 'react';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import {
  NavigationButton,
  LikeButton,
  ArtBox,
  Artist,
  Title,
  RepeatButton,
  SkipPreviousButton,
  PlayButton,
  SkipNextButton,
  PlayListPlusButton,
  Slider,
  TimePosition,
  TimeDuration,
} from '../../components';

const {width} = Dimensions.get('window');

export function PlayerScreen() {
  return (
    <SafeAreaView style={styles.root}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={['#FF0076', '#590F87']}
        style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <NavigationButton
            iconName="chevron-down"
            screenName="Library"
            size={width / 14}
            color="white"
          />
          <Text style={styles.text}>NOW PLAYING</Text>
          <LikeButton size={width / 20} color="white" />
        </View>

        {/* Artwork */}
        <View style={styles.artwork}>
          <ArtBox />
        </View>

        {/* Info */}
        <View style={styles.info}>
          <Artist style={styles.artist} />
          <Title style={styles.title} />
        </View>

        {/* Control Panel */}
        <View style={styles.controlPanel}>
          <RepeatButton size={width / 17} color="white" />
          <SkipPreviousButton size={width / 12} color="white" />
          <PlayButton size={width / 7} color="white" />
          <SkipNextButton size={width / 12} color="white" />
          <PlayListPlusButton size={width / 14.5} color="white" />
        </View>

        {/* Slider with Timer */}
        <View style={styles.sliderWithTimer}>
          <View style={styles.slider}>
            <Slider
              style={{width: '100%'}}
              minimumTrackTintColor="red"
              maximumTrackTintColor="gainsboro"
              thumbTintColor="white"
            />
          </View>
          <View style={styles.timer}>
            <TimePosition style={styles.timePosition} />
            <TimeDuration style={styles.timeDuration} />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  header: {
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  artwork: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 1.2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlPanel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  sliderWithTimer: {
    flex: 1,
  },
  slider: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  /* Texts */
  text: {
    color: 'white',
  },
  artist: {
    fontSize: width / 20,
    color: 'red',
  },
  title: {
    fontSize: width / 15,
    color: 'white',
  },
  timePosition: {
    color: 'white',
  },
  timeDuration: {
    color: 'white',
  },
});
