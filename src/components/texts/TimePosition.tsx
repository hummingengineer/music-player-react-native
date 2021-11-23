import React, {useCallback} from 'react';
import type {FC, ComponentProps} from 'react';
import {Text} from 'react-native';
import {useProgress} from 'react-native-track-player';

import {secondsToHHMMSS as converter} from '../../utils';

type TextProps = ComponentProps<typeof Text>;

const TimePosition: FC<TextProps> = React.memo(({...props}) => {
  const {position} = useProgress();

  const secondsToHHMMSS = useCallback(converter, []);

  return <Text {...props}>{secondsToHHMMSS(position)}</Text>;
});

export {TimePosition};
