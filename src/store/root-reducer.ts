import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice';
import { ReducerName } from '@/types/const';

export default combineReducers({
  [ReducerName.Counter]: counterReducer,
});
