export type RootState = {
  BLEList: any[];
  connectedDevice: Object;
  connectedDeviceServices: any[];
  connectedServiceCharacteristics: any[];
  selectedService: Object;
  selectedCharacteristic: Object;
  status: String;
};

export const INITIAL_STATE: RootState = {
  BLEList: [],
  connectedDevice: {},
  connectedDeviceServices: [],
  connectedServiceCharacteristics: [],
  selectedService: {},
  selectedCharacteristic: {},
  status: 'disconnected',
};
