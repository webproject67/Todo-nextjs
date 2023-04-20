import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getToken, saveToken } from '@/utils/token';

export const signUpAction = createAsyncThunk<
  {
    email: string;
    token: string;
  },
  {
    email: string;
    password: string;
    confirmPassword: string;
  }
>('user/signUp', async (values) => {
  const response = await fetch(`api/user/signUp`, {
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

export const signInAction = createAsyncThunk<
  {
    email: string;
    token: string;
  },
  {
    email: string;
    password: string;
  }
>('user/signIn', async (values) => {
  const response = await fetch(`api/user/signIn`, {
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
