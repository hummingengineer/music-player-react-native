import React, {useEffect} from 'react';

import {requestPermissions} from './src/utils';

export default function App() {
  useEffect(() => {
    const setup = async () => {
      await requestPermissions();
    };

    setup();
  }, []);

  return <></>;
}
