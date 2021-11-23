import type {ComponentProps} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import type {RootStackParamList} from '../../types';

type IconProps = ComponentProps<typeof Icon>;

export type IconButtonProps = {
  touchableOpacityProps?: ComponentProps<typeof TouchableOpacity>;
  iconProps: IconProps;
};

export type UtilIconButtonProps = Omit<IconProps, 'name' | 'onPress'>;

export type NavigationButtonProps = Omit<
  ComponentProps<typeof Icon>,
  'name' | 'onPress'
> & {
  iconName: string;
  screenName: keyof RootStackParamList;
};
