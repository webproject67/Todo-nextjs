/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ReducerName } from '@/utils/const';

interface DrawerState {
  isOpenDrawer: boolean;
}

const initialState: DrawerState = {
  isOpenDrawer: false,
};

export const drawerSlice = createSlice({
  name: ReducerName.Drawer,
  initialState,
  reducers: {
    setOpenDrawer: (state, action: PayloadAction<boolean>) => {
      state.isOpenDrawer = action.payload;
    },
  },
});

export const { setOpenDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
