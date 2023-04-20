import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getToken } from '@/utils/token';

export const checkAuthAction = createAsyncThunk('user/checkAuth', async () => {
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

export const checkAuthAction1 = createAsyncThunk('user/checkAuth', async () => {
  await fetch(`api/user/checkAuth11`, {
    method: 'POST',
    headers: {
      '11111': '22222',
      Authorization: `Bearer ${getToken()}`,
    },
  });
});
