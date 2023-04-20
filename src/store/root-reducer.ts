import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice';
import userReducer from './user/userSlice';
import { ReducerName } from '@/utils/const';

export default combineReducers({
  [ReducerName.Counter]: counterReducer,
  [ReducerName.User]: userReducer,
});
