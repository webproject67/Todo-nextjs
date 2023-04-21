import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getToken, saveToken, dropToken } from '@/utils/token';

export const registrationAction = createAsyncThunk<
  {
    email: string;
    token: string;
  },
  {
    email: string;
    password: string;
    confirmPassword: string;
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

export const logoutAction = createAsyncThunk<void, undefined>(
  'user/logout',
  async () => {
    const response = await fetch(`api/user/logout`, {
      method: 'DELETE',
    });

    await response.json();
    dropToken();
  }
);
