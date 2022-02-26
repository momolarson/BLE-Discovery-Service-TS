import update from 'immutability-helper';
import {INITIAL_STATE} from '../store';

const BLEReducer = (state = INITIAL_STATE, action: any) => {
  //console.log('Reducer:', action);
  switch (action.type) {
    case 'ADD_BLE':
      if (
        state.BLEList.some(device => device.id === action.payload.id) ||
        action.payload.name === null
      ) {
        return state;
      } else {
        return update(state, {
          BLEList: {$set: [...state.BLEList, action.payload]},
        });
      }
    case 'CONNECTED_DEVICE':
      return update(state, {connectedDevice: {$set: action.payload}});
    case 'CONNECTED_SERVICES':
      //console.log('CONNECTED_SERVICES:', action.payload);
      return update(state, {
        connectedDeviceServices: {$set: action.payload},
      });
    case 'SELECTED_SERVICE':
      return update(state, {selectedService: {$set: action.payload}});
    case 'SELECTED_CHARACTERISTIC':
      return update(state, {
        selectedCharacteristic: {$set: action.payload},
      });
    case 'CONNECTED_CHARACTERISTICS':
      return update(state, {
        connectedServiceCharacteristics: {
          $set: action.payload,
        },
      });
    case 'CHANGE_STATUS':
      console.log('CHANGE_STATUS', action.payload);
      return update(state, {status: {$set: action.payload}});
    default:
      return state;
  }
};

export default BLEReducer;
