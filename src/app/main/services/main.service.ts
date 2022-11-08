import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBoard } from 'src/app/core/models/board.model';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private readonly url = 'https://creepy-catacombs-89955.herokuapp.com';

  constructor(private http: HttpClient) {}

  getAllBoards() {
    return this.http.get<IBoard[]>(`${this.url}/boards`);
  }
}
