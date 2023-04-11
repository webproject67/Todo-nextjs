import type { RootState } from '@/types/store';
import { ReducerName } from '@/utils/const';

export const selectCount = (state: RootState) =>
  state[ReducerName.Counter].value;
export const selectCount2 = (state: RootState) =>
  state[ReducerName.Counter].value;
