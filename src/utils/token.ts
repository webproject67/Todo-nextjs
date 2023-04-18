import { TOKEN_NAME } from './const';

export const getToken = (): string => {
  const token = localStorage.getItem(TOKEN_NAME);
  return token ?? '';
};

export const saveToken = (token: string): void => {
  localStorage.setItem(TOKEN_NAME, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(TOKEN_NAME);
};
