import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getToken, saveToken, dropToken } from '@/utils/token';
import { OutputChanges, OutputTask } from '@/types/task';
import { AppDispatch } from '@/types/store';
import { removeAllTasks } from './task/taskSlice';

export const registrationAction = createAsyncThunk<
  {
    email: string;
    name: string;
    surname: string;
    token: string;
  },
  {
    email: string;
    password: string;
    confirmPassword?: string;
    authGoogle?: boolean;
  }
>('user/registration', async (values) => {
  const response = await fetch(`api/user/registration`, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 404) toast.error('404 Ошибка');

  const json = await response.json();

  if (response.ok) {
    saveToken(json.token);
    return json;
  }

  toast.error(json.message || response.statusText);
  throw new Error('Не авторизован');
});

export const loginAction = createAsyncThunk<
  {
    email: string;
    name: string;
    surname: string;
    token: string;
  },
  {
    email: string;
    password: string;
  }
>('user/login', async (values) => {
  const response = await fetch(`api/user/login`, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 404) toast.error('404 Ошибка');

  const json = await response.json();

  if (response.ok) {
    saveToken(json.token);
    return json;
  }

  toast.error(json.message || response.statusText);
  throw new Error('Не авторизован');
});

export const checkAuthAction = createAsyncThunk<
  {
    email: string;
    name: string;
    surname: string;
  },
  undefined
>('user/checkAuth', async () => {
  const response = await fetch(`api/user/checkAuth`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (response.status === 404) toast.error('404 Ошибка');

  const json = await response.json();

  if (response.ok) return json;

  throw new Error('Не авторизован');
});

export const updateAction = createAsyncThunk<
  {
    email: string;
    name: string;
    surname: string;
    token: string;
  },
  {
    email: string;
    password: string;
    name: string;
    surname: string;
  }
>('user/update', async (values) => {
  const response = await fetch(`api/user/update`, {
    method: 'PUT',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 404) toast.error('404 Ошибка');

  const json = await response.json();

  if (response.ok) {
    saveToken(json.token);
    toast.success('Сохранено');
    return json;
  }

  toast.error(json.message || response.statusText);
  throw new Error('Не авторизован');
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
  }
>('user/logout', async (_arg, { dispatch }) => {
  const response = await fetch(`api/user/logout`, {
    method: 'DELETE',
  });

  await response.json();
  dropToken();
  dispatch(removeAllTasks());
});

export const getTasksAction = createAsyncThunk<
  OutputTask[],
  {
    user: string;
  }
>('task/getAll', async (values) => {
  const response = await fetch(`api/task/getAll`, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 404) toast.error('404 Ошибка');

  const json = await response.json();

  if (response.ok) return json;

  toast.error(json.message || response.statusText);
  throw new Error('Не удалось добавить');
});

export const addTaskAction = createAsyncThunk<
  OutputTask,
  {
    text: string;
    user: string;
  }
>('task/create', async (values) => {
  const response = await fetch(`api/task/create`, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 404) toast.error('404 Ошибка');

  const json = await response.json();

  if (response.ok) return json;

  toast.error(json.message || response.statusText);
  throw new Error('Не удалось добавить');
});

export const updateTaskAction = createAsyncThunk<
  OutputChanges,
  { id: string; changes: { isClosed?: boolean; priority?: string } }
>('task/update', async (values) => {
  const response = await fetch(`api/task/update`, {
    method: 'PUT',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 404) toast.error('404 Ошибка');

  const json = await response.json();

  if (response.ok) return json;

  toast.error(json.message || response.statusText);
  throw new Error('Не удалось обновить');
});

export const deleteTaskAction = createAsyncThunk<string, string>(
  'task/delete',
  async (values) => {
    const response = await fetch(`api/task/delete`, {
      method: 'DELETE',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 404) toast.error('404 Ошибка');

    const json = await response.json();

    if (response.ok) return json;

    toast.error(json.message || response.statusText);
    throw new Error('Не удалось удалить');
  }
);
