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

  public createBoard(title: string, description: string) {
    return this.http.post<IBoard>(`${this.url}/boards`, {
      title,
      description,
    });
  }
}
