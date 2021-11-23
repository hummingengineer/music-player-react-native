import type {ComponentProps} from 'react';
import SliderCommunity from '@react-native-community/slider';

export type SliderProps = Pick<
  ComponentProps<typeof SliderCommunity>,
  | 'style'
  | 'disabled'
  | 'minimumTrackTintColor'
  | 'maximumTrackTintColor'
  | 'thumbTintColor'
  | 'inverted'
  | 'vertical'
>;
