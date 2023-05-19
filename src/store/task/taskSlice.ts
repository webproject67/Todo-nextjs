/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  getTasksAction,
  addTaskAction,
  updateTaskAction,
  deleteTaskAction,
} from '../api-actions';
import { ReducerName } from '@/utils/const';
import { OutputChanges, OutputTask } from '@/types/task';

const tasksAdapter = createEntityAdapter<OutputTask>({
  selectId: (task) => task._id,
  sortComparer: (a, b) => {
    if (a.isClosed < b.isClosed) return -1;
    if (a.isClosed > b.isClosed) return 1;
    return a.priority.localeCompare(b.priority);
  },
});

export const taskSlice = createSlice({
  name: ReducerName.Task,
  initialState: tasksAdapter.getInitialState({ isLoading: false }),
  reducers: {
    removeAllTasks: (state) => {
      tasksAdapter.removeAll(state);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getTasksAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getTasksAction.fulfilled,
        (state, action: PayloadAction<OutputTask[]>) => {
          tasksAdapter.setAll(state, action.payload);
          state.isLoading = false;
        }
      )
      .addCase(getTasksAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addTaskAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        addTaskAction.fulfilled,
        (state, action: PayloadAction<OutputTask>) => {
          tasksAdapter.addOne(state, action.payload);
          state.isLoading = false;
        }
      )
      .addCase(addTaskAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(
        updateTaskAction.fulfilled,
        (state, action: PayloadAction<OutputChanges>) => {
          tasksAdapter.updateOne(state, action.payload);
        }
      )
      .addCase(
        deleteTaskAction.fulfilled,
        (state, action: PayloadAction<string>) => {
          tasksAdapter.removeOne(state, action.payload);
        }
      );
  },
});

export const { removeAllTasks } = taskSlice.actions;

export default taskSlice.reducer;
