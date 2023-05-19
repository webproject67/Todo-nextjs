import { combineReducers } from '@reduxjs/toolkit';
import drawerReducer from './drawer/drawerSlice';
import userReducer from './user/userSlice';
import taskReducer from './task/taskSlice';
import { ReducerName } from '@/utils/const';

export default combineReducers({
  [ReducerName.Drawer]: drawerReducer,
  [ReducerName.User]: userReducer,
  [ReducerName.Task]: taskReducer,
});
