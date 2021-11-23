import React, {useState, useEffect, useCallback} from 'react';
import type {FC} from 'react';
import SliderCommunity from '@react-native-community/slider';
import TrackPlayer, {useProgress} from 'react-native-track-player';

import type {SliderProps} from '../../types';

const Slider: FC<SliderProps> = React.memo(({...props}) => {
  const {position, duration} = useProgress();
  const [sliderValue, setSliderValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  const handleSlidingStart = useCallback(() => setIsSeeking(true), []);

  const handleSlidingComplete = useCallback(async value => {
    await TrackPlayer.seekTo(value);
    setSliderValue(value);
    setIsSeeking(false);
  }, []);

  // This hook updates the value of the slider whenever the current position of the song changes
  useEffect(() => {
    if (!isSeeking && position && duration) {
      setSliderValue(position);
    }
  }, [position, duration]);

  return (
    <SliderCommunity
      {...props}
      minimumValue={0}
      maximumValue={duration}
      value={sliderValue}
      onSlidingStart={handleSlidingStart}
      onSlidingComplete={handleSlidingComplete}
    />
  );
});

export {Slider};
