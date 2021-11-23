export interface Local {
  id: string;
  title: string | null;
  author: string | null;
  album: string | null;
  genre: string | null;
  duration: string; // miliseconds
  cover: string | undefined; // android content uri
  // blur: string; //Will come null if createBLur is set to false
  path: string;
  fileName: string;
}

export type {Track} from 'react-native-track-player';
