import update from 'immutability-helper';
import {INITIAL_STATE} from '../store';

const BLEReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_BLE':
      //console.log('BLEReducer: ', state.BLEList);
      if (
        state.BLEList.some(device => device.id === action.device.id) ||
        action.device.name === null
      ) {
        console.log('BLEReducer: ', state.BLEList.length);
        return state;
      } else {
        return update(state, {
          BLEList: {$set: [...state.BLEList, action.device]},
        });
      }
    case 'CONNECTED_DEVICE':
      return update(state, {connectedDevice: {$set: action.connectedDevice}});
    case 'CONNECTED_SERVICES':
      return update(state, {
        connectedDeviceServices: {$set: action.connectedDeviceServices},
      });
    case 'SELECTED_SERVICE':
      return update(state, {selectedService: {$set: action.selectedService}});
    case 'SELECTED_CHARACTERISTIC':
      return update(state, {
        selectedCharacteristic: {$set: action.selectedCharacteristic},
      });
    case 'CONNECTED_CHARACTERISTICS':
      return update(state, {
        connectedServiceCharacteristics: {
          $set: action.connectedServiceCharacteristics,
        },
      });
    case 'CHANGE_STATUS':
      return update(state, {status: {$set: action.status}});
    default:
      return state;
  }
};

export default BLEReducer;
