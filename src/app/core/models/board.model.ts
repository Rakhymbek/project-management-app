export interface IBoard {
  id?: string;
  title: string;
  description: string;
}

export interface DialogCreateData {
  event: string;
  id: string;
  title: string;
  description: string;
}

export interface DialogDeleteData {
  event: string;
  element: string;
  id: string;
}

export interface DialogOptions {
  width: string;
  data: { event: string; element: string; id: string | undefined };
}

export interface DialogErrorData {
  code: number;
}

export interface IColumn {
  id: string;
  title: string;
  order?: number;
}
export interface ITaskData {
  id: string;
  title: string;
  order: number;
  description: string;
  boardId?: string;
  userId: string;
  userName?: string;
  files: unknown[];
}
export interface IColumnData {
  id: string;
  title: string;
  order: number;
  tasks: ITaskData[];
}
export interface IBoardData {
  id: string;
  title: string;
  description: string;
  columns: IColumnData[];
}

export interface IColumnsData {
  boardId: string | undefined;
  columns: IColumn[];
}

export interface ITask {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  id: string;
  userName?: string;
}

export interface IUser {
  id: string;
  name: string;
  login: string;
}
