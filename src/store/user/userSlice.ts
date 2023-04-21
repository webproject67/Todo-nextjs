/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  registrationAction,
  loginAction,
  checkAuthAction,
  updateAction,
  logoutAction,
} from '../api-actions';
import { ReducerName, AuthorizationStatus } from '@/utils/const';

interface UserState {
  userData: {
    email: string;
    name: string;
    surname: string;
  };
  authorizationStatus: AuthorizationStatus;
  isLoading: boolean;
}

const initialState: UserState = {
  userData: {
    email: '',
    name: '',
    surname: '',
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
      .addCase(registrationAction.pending, (state) => {
        state.authorizationStatus = AuthorizationStatus.Unknown;
        state.isLoading = true;
      })
      .addCase(
        registrationAction.fulfilled,
        (state, action: PayloadAction<{ email: string }>) => {
          state.userData.email = action.payload.email;
          state.authorizationStatus = AuthorizationStatus.Auth;
          state.isLoading = false;
        }
      )
      .addCase(registrationAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isLoading = false;
      })
      .addCase(loginAction.pending, (state) => {
        state.authorizationStatus = AuthorizationStatus.Unknown;
        state.isLoading = true;
      })
      .addCase(
        loginAction.fulfilled,
        (
          state,
          action: PayloadAction<{
            email: string;
            name: string;
            surname: string;
          }>
        ) => {
          state.userData = {
            email: action.payload.email,
            name: action.payload.name,
            surname: action.payload.surname,
          };
          state.authorizationStatus = AuthorizationStatus.Auth;
          state.isLoading = false;
        }
      )
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isLoading = false;
      })
      .addCase(
        checkAuthAction.fulfilled,
        (
          state,
          action: PayloadAction<{
            email: string;
            name: string;
            surname: string;
          }>
        ) => {
          state.userData = {
            email: action.payload.email,
            name: action.payload.name,
            surname: action.payload.surname,
          };
          state.authorizationStatus = AuthorizationStatus.Auth;
        }
      )
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(updateAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateAction.fulfilled,
        (
          state,
          action: PayloadAction<{
            email: string;
            name: string;
            surname: string;
          }>
        ) => {
          state.userData = {
            email: action.payload.email,
            name: action.payload.name,
            surname: action.payload.surname,
          };
          state.isLoading = false;
        }
      )
      .addCase(updateAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.userData = {
          email: '',
          name: '',
          surname: '',
        };
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  },
});

export default userSlice.reducer;
