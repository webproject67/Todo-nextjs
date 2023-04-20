/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { signUpAction, signInAction, checkAuthAction } from '../api-actions';
import { ReducerName, AuthorizationStatus } from '@/utils/const';

interface UserState {
  userData: {
    email: string;
  };
  authorizationStatus: AuthorizationStatus;
  isLoading: boolean;
}

const initialState: UserState = {
  userData: {
    email: '',
  },
  authorizationStatus: AuthorizationStatus.Unknown,
  isLoading: false,
};

export const userSlice = createSlice({
  name: ReducerName.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(signUpAction.pending, (state) => {
        state.authorizationStatus = AuthorizationStatus.Unknown;
        state.isLoading = true;
      })
      .addCase(
        signUpAction.fulfilled,
        (state, action: PayloadAction<{ email: string }>) => {
          state.userData = {
            email: action.payload.email,
          };
          state.authorizationStatus = AuthorizationStatus.Auth;
          state.isLoading = false;
        }
      )
      .addCase(signUpAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isLoading = false;
      })
      .addCase(signInAction.pending, (state) => {
        state.authorizationStatus = AuthorizationStatus.Unknown;
        state.isLoading = true;
      })
      .addCase(
        signInAction.fulfilled,
        (state, action: PayloadAction<{ email: string }>) => {
          state.userData = {
            email: action.payload.email,
          };
          state.authorizationStatus = AuthorizationStatus.Auth;
          state.isLoading = false;
        }
      )
      .addCase(signInAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isLoading = false;
      })
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
