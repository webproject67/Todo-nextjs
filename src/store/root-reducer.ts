import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice';
import userReducer from './user/userSlice';
import taskReducer from './task/taskSlice';
import { ReducerName } from '@/utils/const';

export default combineReducers({
  [ReducerName.Counter]: counterReducer,
  [ReducerName.User]: userReducer,
  [ReducerName.Task]: taskReducer,
});
