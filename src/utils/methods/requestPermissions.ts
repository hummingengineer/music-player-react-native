import {PermissionsAndroid} from 'react-native';

export async function requestPermissions() {
  // if permissions are already existed
  if (
    (await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    )) &&
    (await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ))
  ) {
    return;
  }

  // If permissions are not existed
  else {
    try {
      const userResponse = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      if (
        userResponse['android.permission.READ_EXTERNAL_STORAGE'] !==
          'granted' ||
        userResponse['android.permission.WRITE_EXTERNAL_STORAGE'] !== 'granted'
      ) {
        console.warn('Permissions Denied. Some functions may not work.');
      }
    } catch (err) {
      console.warn(err);
    }
  }
}
