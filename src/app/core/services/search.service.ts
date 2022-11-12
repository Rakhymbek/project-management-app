import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBoard, IColumn, ITask, IUser } from '../models/board.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  public getAllBoards(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>('boards');
  }

  public getAllColumns(id: string): Observable<IColumn[]> {
    return this.http.get<IColumn[]>(`boards/${id}/columns`);
  }

  public getAllTasks(boardId: string, columnId: string): Observable<ITask[]> {
    return this.http.get<ITask[]>(`boards/${boardId}/columns/${columnId}/tasks`);
  }

  public getUser(id: string): Observable<IUser> {
    return this.http.get<IUser>(`users/${id}`);
  }
}
