import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice';
import { ReducerName } from '@/utils/const';

export default combineReducers({
  [ReducerName.Counter]: counterReducer,
});
