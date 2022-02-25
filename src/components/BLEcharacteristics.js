import React from 'react';
import {connect} from 'react-redux';
import BLEReadCharacteristic from './BLEReadCharacteristic';
import BLEWriteCharacteristic from './BLEWriteCharacteristic';

function BLEcharacteristic(ReduxStore) {
  if (ReduxStore.selectedCharacteristic.isReadable) {
    return <BLEReadCharacteristic />;
  } else if (
    ReduxStore.selectedCharacteristic.isWritableWithResponse ||
    ReduxStore.selectedCharacteristic.isWritableWithoutResponse
  ) {
    return <BLEWriteCharacteristic />;
  }
}

function mapStateToProps(state) {
  return {
    selectedCharacteristic: state.BLEs.selectedCharacteristic,
  };
}

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(BLEcharacteristic);
