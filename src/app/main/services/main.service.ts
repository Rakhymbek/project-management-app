import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBoard } from 'src/app/core/models/board.model';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private readonly url = 'https://creepy-catacombs-89955.herokuapp.com';

  constructor(private http: HttpClient) {}

  public getAllBoards(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(`${this.url}/boards`);
  }

  public createBoard(title: string, description: string): Observable<IBoard> {
    return this.http.post<IBoard>(`${this.url}/boards`, {
      title,
      description,
    });
  }

  public deleteBoard(id: string): Observable<Object> {
    return this.http.delete(`${this.url}/boards/${id}`);
  }

  public updateBoard(id: string, body: IBoard): Observable<IBoard> {
    return this.http.put(`${this.url}/boards/${id}`, body) as Observable<IBoard>;
  }
}
