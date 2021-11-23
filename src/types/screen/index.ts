import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Library: undefined;
  Player: undefined;
};

export type LibraryScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Library'
>;

export type PlayerScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Player'
>;

export type NavigationProps =
  | LibraryScreenNavigationProp
  | PlayerScreenNavigationProp;
