import React, {useCallback} from 'react';
import type {FC} from 'react';
import {useNavigation} from '@react-navigation/native';

import {IconButton} from './IconButton';
import type {NavigationProps, NavigationButtonProps} from '../../types';

const NavigationButton: FC<NavigationButtonProps> = React.memo(
  ({iconName, screenName, ...restProps}) => {
    const navigation = useNavigation<NavigationProps>();

    const handlePress = useCallback(() => navigation.navigate(screenName), []);

    return (
      <IconButton
        touchableOpacityProps={{onPress: handlePress}}
        iconProps={{name: iconName, ...restProps}}
      />
    );
  },
);

export {NavigationButton};
