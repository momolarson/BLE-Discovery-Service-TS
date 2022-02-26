import React from 'react';
import {connect} from 'react-redux';

import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';
import {selectedCharacteristic, getServiceCharacteristics} from '../actions';
import DataActivityIndicator from './DataActivityIndicator';
import {RootState} from '../reducers/store';

function Item(characteristic: any) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{characteristic.characteristic.uuid}</Text>
      <Text style={styles.subtext}>
        Notifiable: {characteristic.characteristic.isNotifiable.toString()}
      </Text>
      <Text style={styles.subtext}>
        Notifying: {characteristic.characteristic.isNotifying.toString()}
      </Text>
      <Text style={styles.subtext}>
        Readable: {characteristic.characteristic.isReadable.toString()}
      </Text>
      <Text style={styles.subtext}>
        Indicatable: {characteristic.characteristic.isIndicatable.toString()}
      </Text>
      <Text style={styles.subtext}>
        Writeable with Response:{' '}
        {characteristic.characteristic.isWritableWithResponse.toString()}
      </Text>
      <Text style={styles.subtext}>
        Writeable without Response:{' '}
        {characteristic.characteristic.isWritableWithoutResponse.toString()}
      </Text>
    </View>
  );
}

function handleClick(BLECharacteristic: any, characteristic: any) {
  //console.log('handleclick:', BLECharacteristic);
  BLECharacteristic.selectCharacteristic(characteristic);
  BLECharacteristic.navigation.navigate('BLECharacteristic');
}

function BLEservicecharacteristics(BLECharacteristics: any) {
  BLECharacteristics.getServiceCharacteristics(BLECharacteristics.BLEService);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={BLECharacteristics.BLEServiceCharacteristics}
        renderItem={({item}) => (
          <TouchableHighlight
            onPress={() => handleClick(BLECharacteristics, item)}
            style={styles.item}
            underlayColor={'#AAA'}>
            <Item characteristic={item} />
          </TouchableHighlight>
        )}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={DataActivityIndicator}
      />
    </SafeAreaView>
  );
}
//}

function mapStateToProps(state) {
  return {
    BLEService: state.BLEs.selectedService,
    BLEServiceCharacteristics: state.BLEs.connectedServiceCharacteristics,
  };
}

const mapDispatchToProps = (dispatch: Function) => ({
  selectCharacteristic: (characteristic: any) =>
    dispatch(selectedCharacteristic(characteristic)),
  getServiceCharacteristics: (service: any) =>
    dispatch(getServiceCharacteristics(service)),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(BLEservicecharacteristics);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 2,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 14,
  },
  subtext: {
    fontSize: 10,
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
});
