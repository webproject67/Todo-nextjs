/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { checkAuthAction } from '../api-actions';
import { ReducerName, AuthorizationStatus } from '@/utils/const';

interface UserState {
  userData: {
    email: string;
  };
  authorizationStatus: AuthorizationStatus;
}

const initialState: UserState = {
  userData: {
    email: '',
  },
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const userSlice = createSlice({
  name: ReducerName.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        checkAuthAction.fulfilled,
        (state, action: PayloadAction<{ email: string }>) => {
          state.userData = {
            email: action.payload.email,
          };
          state.authorizationStatus = AuthorizationStatus.Auth;
        }
      )
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  },
});

export default userSlice.reducer;
