import type { RootState } from '@/types/store';
import { ReducerName } from '@/utils/const';

export const selectData = (state: RootState) =>
  state[ReducerName.User].userData;
export const selectAuthorizationStatus = (state: RootState) =>
  state[ReducerName.User].authorizationStatus;
export const selectLoading = (state: RootState) =>
  state[ReducerName.User].isLoading;
