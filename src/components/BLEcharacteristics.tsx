import React from 'react';
import {connect} from 'react-redux';
import BLEReadCharacteristic from './BLEReadCharacteristic';
import BLEWriteCharacteristic from './BLEWriteCharacteristic';
import {RootState} from '../reducers/store';

type reduxStore = {
  selectedCharacteristic: any;
};

function BLEcharacteristic(ReduxStore: reduxStore) {
  return (
    <>
      {ReduxStore.selectedCharacteristic.isReadable && (
        <BLEReadCharacteristic />
      )}
      {(ReduxStore.selectedCharacteristic.isWritableWithResponse ||
        ReduxStore.selectedCharacteristic.isWritableWithoutResponse) && (
        <BLEWriteCharacteristic />
      )}
    </>
  );
}

function mapStateToProps(state: RootState) {
  return {
    selectedCharacteristic: state.BLEs.selectedCharacteristic,
  };
}

export default connect(mapStateToProps, null, null, {
  forwardRef: true,
})(BLEcharacteristic);
