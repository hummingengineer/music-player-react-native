import React from 'react';
import type {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import type {IconButtonProps} from '../../types';

const IconButton: FC<IconButtonProps> = React.memo(
  ({touchableOpacityProps, iconProps}) => {
    return (
      <TouchableOpacity {...touchableOpacityProps}>
        <Icon {...iconProps} />
      </TouchableOpacity>
    );
  },
);

export {IconButton};
