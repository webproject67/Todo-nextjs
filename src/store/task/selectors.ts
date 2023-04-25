import type { RootState } from '@/types/store';
import { ReducerName } from '@/utils/const';

export const selectTasksIds = (state: RootState) => state[ReducerName.Task].ids;
export const selectTasksEntities = (state: RootState) =>
  state[ReducerName.Task].entities;
export const selectLoading = (state: RootState) =>
  state[ReducerName.Task].isLoading;
