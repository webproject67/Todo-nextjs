export type SelectPriority = { id: string; priority: string };

export type OutputChanges = {
  id: string;
  changes: {
    isClosed?: boolean;
    priority?: string;
    updatedAt: string;
  };
};

export type InputTask = {
  text: string;
  user: string;
};

export type OutputTask = InputTask & {
  priority: string;
  isClosed: boolean;
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
};
