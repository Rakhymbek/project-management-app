export interface IBoard {
  id?: string;
  title: string;
  description: string;
}

export interface BoardDialogCreateData {
  event: string;
  id: string;
  title: string;
  description: string;
}

export interface ColumnDialogCreateData {
  event: string;
  boardId: string;
  title: string;
}

export interface BoardDialogDeleteData {
  event: string;
  element: string;
  id: string;
}

export interface ColumnDialogDeleteData {
  event: string;
  boardId: string;
  id: string;
}

export interface BoardDialogOptions {
  width: string;
  data: { event: string; element: string; id: string | undefined };
}

export interface TaskDialogOptions {
  width: string;
  data: { event: string; element: string; boardId: string; columnId: string };
}

export interface ColumnDialogOptions {
  width: string;
  data: { event: string; element: string; boardId: string; id: string | undefined };
}

export interface DialogErrorData {
  code: number;
}

export interface IColumn {
  id?: string;
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

export interface ITask {
  id?: string;
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
