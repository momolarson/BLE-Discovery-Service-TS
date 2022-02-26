import React from 'react';
import {connect} from 'react-redux';
import {Container, Text} from 'native-base';
import {RootState} from '../reducers/store';

interface propsType {
  status: String;
  connectedDevice: any;
}
class BLE extends React.Component<propsType> {
  constructor(props: propsType) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Text>Status: {this.props.status}</Text>
        {this.props.connectedDevice && (
          <Text>Device: {this.props.connectedDevice.name}</Text>
        )}
      </Container>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    BLEList: state.BLEs.BLEList,
    connectedDevice: state.BLEs.connectedDevice,
    status: state.BLEs.status,
  };
}

export default connect(mapStateToProps, null, null, {
  forwardRef: true,
})(BLE);
