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
import {selectedService} from '../actions';
import DataActivityIndicator from './DataActivityIndicator';
import {RootState} from '../reducers/store';
import BLE from './BLE';
import {HStack} from 'native-base';

function Item(service: any) {
  //console.log('Item:', service.uuid);
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{service.service.uuid}</Text>
      <Text style={styles.subtext}>
        Primary: {service.service.isPrimary.toString()}
      </Text>
    </View>
  );
}

function handleClick(BLEServices: any, serviceId: string) {
  BLEServices.selectedService(serviceId);
  BLEServices.navigation.navigate('BLECharacteristics');
}

function BLEservices(BLEServices: any) {
  //console.log('BLEservice:', BLEServices);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={BLEServices.connectedDeviceServices}
        renderItem={({item}) => (
          <TouchableHighlight
            onPress={() => handleClick(BLEServices, item)}
            style={styles.item}
            underlayColor={'#CCC'}>
            <Item service={item} />
          </TouchableHighlight>
        )}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={DataActivityIndicator}
      />
      <HStack>
        <BLE />
      </HStack>
    </SafeAreaView>
  );
}
//}

function mapStateToProps(state: RootState) {
  return {
    connectedDeviceServices: state.BLEs.connectedDeviceServices,
  };
}

const mapDispatchToProps = (dispatch: Function) => ({
  selectedService: (service: any) => dispatch(selectedService(service)),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(BLEservices);

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
    color: '#000',
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
