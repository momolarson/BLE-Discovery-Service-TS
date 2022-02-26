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
import BLEList from './components/BLElist';
import BLEservices from './components/BLEservices';
import BLEcharacteristic from './components/BLEcharacteristics';
import BLEservicecharacteristics from './components/BLEservicecharacteristics';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {NativeBaseProvider} from 'native-base';
import {store} from './reducers/store';

const Stack = createStackNavigator();

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
              component={BLEcharacteristic}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
