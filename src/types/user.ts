export type AuthType = {
  email: string;
  password: string;
};

export type DataType = AuthType & {
  name?: string;
  surname?: string;
};
