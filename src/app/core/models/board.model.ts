export interface IBoard {
  id?: string;
  title: string;
  description: string;
}
export interface IBoardData {
  id: string;
  title: string;
  description: string;
  columns: IColumnData[];
}
export interface BoardDialogCreateData {
  event: string;
  id: string;
  title: string;
  description: string;
}
export interface BoardDialogDeleteData {
  event: string;
  element: string;
  id: string | undefined;
}
export interface BoardDialogOptions {
  width: string;
  data: BoardDialogDeleteData;
}

export interface ColumnDialogCreateData {
  event: string;
  boardId: string;
  title: string;
  id: string;
}
export interface ColumnDialogDeleteData {
  event: string;
  element: string;
  boardId: string;
  id: string | undefined;
}
export interface ColumnDialogOptions {
  width: string;
  data: ColumnDialogDeleteData;
}
export interface IColumn {
  id?: string;
  title: string;
  order?: number;
}

export interface IColumnData {
  id: string;
  title: string;
  order: number;
  tasks: ITaskData[];
}

export interface ITask {
  id?: string;
  title: string;
  order?: number;
  description: string;
  userId: string;
  boardId?: string;
  columnId?: string;
  userName?: string;
}

//For creation and updation of tasks
export interface TaskDialogCreateData {
  event: string;
  boardId: string;
  columnId: string;
  userId: string;
  userName: string;
  order: number | undefined;
  description: string;
  title: string;
  id: string;
}
export interface TaskDialogDeleteData {
  event: string;
  boardId: string;
  element: string;
  columnId: string;
  id: string | undefined;
}
export interface ITaskData {
  id: string;
  title: string;
  order: number;
  description: string;
  boardId: string;
  columnId: string;
  userId: string;
  userName: string;
}

export interface TaskDialogOptions {
  width: string;
  data: TaskDialogDeleteData;
}

export interface DialogErrorData {
  code: number;
}

export interface IUser {
  id: string;
  name: string;
  login: string;
}
