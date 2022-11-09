export interface IBoard {
  id: string;
  title: string;
  description: string;
}

export interface DialogCreateData {
  event: string;
  title: string;
  description: string;
}

export interface DialogData {
  event: string;
  id: string;
}

export interface DialogOptions {
  width: string;
  data?: { id: string };
}
