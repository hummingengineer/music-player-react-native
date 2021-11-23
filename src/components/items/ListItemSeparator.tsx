import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

export function ListItemSeparator() {
  const {colors} = useTheme();

  return (
    <View style={[styles.itemSeparator, {backgroundColor: colors.border}]} />
  );
}

const styles = StyleSheet.create({
  itemSeparator: {
    height: StyleSheet.hairlineWidth,
  },
});
