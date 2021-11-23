import React, {useCallback} from 'react';
import type {FC, ComponentProps} from 'react';
import {Text} from 'react-native';
import {useProgress} from 'react-native-track-player';

import {secondsToHHMMSS as converter} from '../../utils';

type TextProps = ComponentProps<typeof Text>;

const TimeDuration: FC<TextProps> = React.memo(({...props}) => {
  const {duration} = useProgress();

  const secondsToHHMMSS = useCallback(converter, []);

  return <Text {...props}>{secondsToHHMMSS(duration)}</Text>;
});

export {TimeDuration};
