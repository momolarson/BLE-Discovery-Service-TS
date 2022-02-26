export type RootState = {
  BLEList: any[];
  connectedDevice: Object;
  connectedDeviceServices: any[];
  connectedServiceCharacteristics: any[];
  selectedService: Object;
  selectedCharacteristic: Object;
  status: String;
};

export type DeviceManager = {
  _manager: Object;
  id: String;
  isConnectable: Boolean;
  localName: String;
  manufacturerData: any;
  mtu: Number;
  name: String;
  overflowServiceUUIDs: any;
  rssi: Number;
  serviceData: any;
  serviceUUIDs: [];
  solicitedServiceUUIDs: any;
  txPowerLevel: any;
  onStateChange: Function;
  startDeviceScan: Function;
  characteristicsForDevice: Function;
  stopDeviceScan: Function;
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
