import Base64 from '../Base64';
import {PermissionsAndroid, Platform} from 'react-native';
import {createAction, AnyAction} from '@reduxjs/toolkit';
import {ThunkAction} from 'redux-thunk';
import {DeviceManager} from '../store';
import {RootState} from '../reducers/store';

export const addBLE = createAction<any>('ADD_BLE');
export const connectedDevice = createAction<any>('CONNECTED_DEVICE');
export const connectedServiceCharacteristics = createAction<any>(
  'CONNECTED_CHARACTERISTICS',
);
export const connectedDeviceServices = createAction<any>('CONNECTED_SERVICES');
export const selectedService = createAction<any>('SELECTED_SERVICE');
export const selectedCharacteristic = createAction<any>(
  'SELECTED_CHARACTERISTIC',
);
export const changeStatus = createAction<string>('CHANGE_STATUS');

//some thunks to control the BLE Device

export const startScan = (): ThunkAction<
  void,
  RootState,
  DeviceManager,
  AnyAction
> => {
  return (dispatch, getState, DeviceMgr) => {
    // you can use Device Manager here
    console.log('start Scanning');
    const subscription = DeviceMgr.onStateChange((state: string) => {
      if (state === 'PoweredOn') {
        console.log('powered on');
        dispatch(scan());
        subscription.remove();
      }
    }, true);
  };
};

//on android device, we should ask permission
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: 'Location permission for bluetooth scanning',
        message: 'wahtever',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Location permission for bluetooth scanning granted');
      return true;
    } else {
      console.log('Location permission for bluetooth scanning revoked');
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export const scan = (): ThunkAction<
  void,
  RootState,
  DeviceManager,
  AnyAction
> => {
  console.log('scanning...');
  return async (dispatch, getState, DeviceMgr) => {
    const permission =
      Platform.OS === 'ios' ? true : await requestLocationPermission();
    if (permission) {
      DeviceMgr.startDeviceScan(null, null, (error: string, device: any) => {
        //console.log('Scanning for Devices');
        dispatch(changeStatus('Scanning'));
        if (error) {
          console.log(error);
        }
        if (device !== null) {
          //console.log('Adding Devices:', device);
          dispatch(addBLE(device));
        }
      });
    } else {
      //TODO: here we could treat any new state or new thing when there's no permission to BLE
      console.log('Error permission');
    }
  };
};

export const getServiceCharacteristics = (
  service: any,
): ThunkAction<void, RootState, DeviceManager, AnyAction> => {
  return (dispatch, getState, DeviceMgr) => {
    let state = getState();
    // console.log('getServiceCharacteristics', state.BLEs.connectedDevice);
    DeviceMgr.characteristicsForDevice(
      state.BLEs.connectedDevice.id,
      service.uuid,
    ).then((characteristics: any) => {
      //  console.log('getServiceCharacteristics', characteristics);
      dispatch(connectedServiceCharacteristics(characteristics));
    });
  };
};

export const connectDevice = (
  device: any,
): ThunkAction<void, RootState, DeviceManager, AnyAction> => {
  return (dispatch, getState, DeviceMgr) => {
    console.log('connectDevice');
    dispatch(changeStatus('Connecting'));
    DeviceMgr.stopDeviceScan();
    device
      .connect()
      .then(() => {
        dispatch(changeStatus('Discovering'));
        let allCharacteristics = device.discoverAllServicesAndCharacteristics();
        dispatch(connectedDevice(device));
        return allCharacteristics;
      })
      .then(() => {
        dispatch(changeStatus('Getting Services'));
        let services = device.services(device.id);
        return services;
      })
      .then(
        (services: any) => {
          dispatch(changeStatus('Found Services'));
          dispatch(connectedDeviceServices(services));
        },
        (error: string) => {
          dispatch(changeStatus('Error Connecting'));
          console.log('Error Connecting Device', error);
        },
      );
  };
};

export const writeCharacteristic = (
  text: string,
): ThunkAction<void, RootState, DeviceManager, AnyAction> => {
  return (dispatch, getState) => {
    const state = getState();
    let buffer = str2ab(text);
    let packetsize = 20;
    let offset = 0;
    let packetlength = packetsize;
    console.log('writeCharacteristic');
    do {
      if (offset + packetsize > buffer.length) {
        packetlength = buffer.length;
      } else {
        packetlength = offset + packetsize;
      }
      let packet = buffer.slice(offset, packetlength);
      console.log('packet: ', packet);
      let base64packet = Base64.btoa(String.fromCharCode.apply(null, packet));
      state.BLEs.connectedDevice.writeCharacteristicWithoutResponseForService(
        state.BLEs.selectedService.uuid,
        state.BLEs.selectedCharacteristic.uuid,
        base64packet,
      );
      offset += packetsize;
    } while (offset < buffer.length);
  };
};

// const crcVal = (array: []) => {
//   let output = array.reduce(function (currentVal, index) {
//     let cVal = <number>currentVal + <number>index;
//     if (cVal > 256) {
//       cVal = <number>currentVal - 256;
//     }
//     return <never>cVal;
//   });
//   return 255 - <number>output;
// };

function str2ab(str: string) {
  console.log('string to send: ', str);
  var bufView = new Uint8Array(str.length);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return bufView;
}
