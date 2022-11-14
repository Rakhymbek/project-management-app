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
  tasks?: ITask[];
}

export interface IColumnsData {
  boardId: string | undefined;
  columns: IColumn[];
}

export interface ITaskData {
  boardId: string | undefined;
  columnId: string;
  tasks: ITask[];
}

export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  userName?: string;
}

export interface IUser {
  id: string;
  name: string;
  login: string;
}

export interface IColumnInfo {
  boardId: string;
  columnId: string;
  title: string;
  order: number | undefined;
  tasks: ITask[];
}
