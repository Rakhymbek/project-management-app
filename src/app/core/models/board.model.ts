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
