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

export interface IBoardData {
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
}
