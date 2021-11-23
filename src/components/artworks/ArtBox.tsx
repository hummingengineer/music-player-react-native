import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Thumbnail} from '../artworks';

export function ArtBox() {
  return (
    <View style={styles.box}>
      <Thumbnail />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: '90%',
    height: '95%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
