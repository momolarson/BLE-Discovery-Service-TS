/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import BLEList from './components/BLElist';
import BLEservices from './components/BLEservices';
import BLECharacteristic from './components/BLEcharacteristics';
import BLEservicecharacteristics from './components/BLEservicecharacteristics';
import {BleManager} from 'react-native-ble-plx';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {NativeBaseProvider} from 'native-base';

const DeviceManager = new BleManager();

const Stack = createStackNavigator();

const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument(DeviceManager))),
);

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="BLEDevices" component={BLEList} />
            <Stack.Screen name="BLEServices" component={BLEservices} />
            <Stack.Screen
              name="BLECharacteristics"
              component={BLEservicecharacteristics}
            />
            <Stack.Screen
              name="BLECharacteristic"
              component={BLECharacteristic}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
