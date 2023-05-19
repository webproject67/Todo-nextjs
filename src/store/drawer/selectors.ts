import type { RootState } from '@/types/store';
import { ReducerName } from '@/utils/const';

export default (state: RootState) => state[ReducerName.Drawer].isOpenDrawer;
