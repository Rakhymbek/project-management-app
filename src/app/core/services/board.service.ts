import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBoard, IColumn, ITask, IUser } from 'src/app/core/models/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private http: HttpClient) {}

  public getAllBoards(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>('boards');
  }

  public createBoard(title: string, description: string): Observable<IBoard> {
    return this.http.post<IBoard>('boards', {
      title,
      description,
    });
  }

  public deleteBoard(id: string): Observable<Object> {
    return this.http.delete(`boards/${id}`);
  }

  public updateBoard(id: string, body: IBoard): Observable<IBoard> {
    return this.http.put(`boards/${id}`, body) as Observable<IBoard>;
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

  public getBoard(id: string) {
    return this.http.get<IUser>(`boards${id}`);
  }
}
