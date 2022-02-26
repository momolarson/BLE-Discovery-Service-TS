import React, {useState} from 'react';
import {connect} from 'react-redux';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  Button,
} from 'react-native';
import {writeCharacteristic} from '../actions';
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

function handleClick(ReduxStore: any, text: String) {
  ReduxStore.writeCharacteristic(text + '\n');
}

function BLEReadcharacteristic(ReduxStore: any) {
  const [text, setText] = useState({text: 'write something to device'});

  return (
    <SafeAreaView style={styles.container}>
      <Text>{ReduxStore.selectedCharacteristic.uuid}</Text>
      <FlatList
        data={[ReduxStore.selectedCharacteristic]}
        renderItem={({item}) => (
          <>
            <Item characteristic={item} />
            <TextInput
              onChangeText={(strText: string) => setText({text: strText})}
              style={styles.textInput}
              value={text.text}
            />
            <Button
              title="Write"
              onPress={() => handleClick(ReduxStore, text.text)}
            />
          </>
        )}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={DataActivityIndicator}
      />
    </SafeAreaView>
  );
}

function mapStateToProps(state: RootState) {
  return {
    selectedCharacteristic: state.BLEs.selectedCharacteristic,
  };
}

const mapDispatchToProps = (dispatch: Function) => ({
  writeCharacteristic: (text: string) => dispatch(writeCharacteristic(text)),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(BLEReadcharacteristic);

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
  textInput: {
    height: 40,
    color: 'black',
    borderColor: 'gray',
    borderWidth: 1,
  },
});
