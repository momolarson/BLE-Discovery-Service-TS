import {configureStore} from '@reduxjs/toolkit';
import {reduxBatch} from '@manaflair/redux-batch';
import thunk from 'redux-thunk';
import BLEReducer from './BLEReducer';
import {BleManager} from 'react-native-ble-plx';

const DeviceManager = new BleManager();

const reducer = {
  BLEs: BLEReducer,
};

export const store = configureStore({
  reducer,
  middleware: [thunk.withExtraArgument(DeviceManager)],
  enhancers: [reduxBatch],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
