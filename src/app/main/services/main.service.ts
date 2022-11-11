import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBoard } from 'src/app/core/models/board.model';

@Injectable({
  providedIn: 'root',
})
export class MainService {
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
}
