import React from 'react';
import {Text, FlatList, TouchableHighlight, View} from 'react-native';
import {Container, HStack} from 'native-base';
import BLE from './BLE';
import {connect} from 'react-redux'; //, ConnectedProps
import {connectDevice, startScan} from '../actions';
import {RootState} from '../reducers/store';
import DataActivityIndicator from './DataActivityIndicator';
import {BLEstyles} from '../styles';

// interface NavigationProps {
//   navigation: NavigationScreenProp<any, any>;
// }

// const mapState = (state: any, bleNavigation: NavigationProps) => ({
//   BLEList: state.BLEs.BLEList,
//   navigation: bleNavigation,
// });

// const mapDispatch = {
//   connectDevice: (device: any) => connectDevice(device),
//   startScan: () => startScan(),
// };

// const connector = connect(mapState, mapDispatch);
// type PropsFromRedux = ConnectedProps<typeof connector>;

// interface Props {
//   BLEList: any[];
//   navigation: any;
// }

class BLEList extends React.Component {
  constructor(props: any) {
    super(props);
    //console.log('constructor: ');
    //console.log(props);
    props.startScan();
  }

  handleClick = (device) => {
    this.props.connectDevice(device);
    this.props.navigation.navigate('BLEServices');
  };

  connectableString = (item: any) => {
    if (item.isConnectable) {
      return 'Tap to connect to: ' + item.name;
    } else {
      return item.name + ' is not connectable';
    }
  };

  render() {
    let dataArray = [];
    //console.log('render props: ', this.props);
    if (this.props.BLEList !== undefined) {
      dataArray = this.props.BLEList;
    }
    return (
      <Container>
        <FlatList
          data={dataArray}
          renderItem={({item}) => (
            <>
              <TouchableHighlight
                onPress={() => this.handleClick(item)}
                style={
                  item.isConnectable ? BLEstyles.rowFront : BLEstyles.rowBack
                }
                underlayColor={'#AAA'}>
                <View>
                  <Text>{this.connectableString(item)}</Text>
                </View>
              </TouchableHighlight>
            </>
          )}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={DataActivityIndicator}
        />

        <HStack>
          <BLE />
        </HStack>
      </Container>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    BLEList: state.BLEs.BLEList,
  };
}

const mapDispatchToProps = dispatch => ({
  connectDevice: device => dispatch(connectDevice(device)),
  startScan: () => dispatch(startScan()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BLEList);
//export default BLEList;
