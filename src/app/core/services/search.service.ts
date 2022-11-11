import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBoard, IColumn, ITask } from '../models/board.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  getAllBoards() {
    return this.http.get<IBoard[]>('boards');
  }

  getAllColumns(id: string) {
    return this.http.get<IColumn[]>(`boards/${id}/columns`);
  }

  getAllTasks(boardId: string, columnId: string) {
    console.log(boardId, columnId);
    return this.http.get<ITask>(`boards/${boardId}/columns/${columnId}/tasks`);
  }
}
