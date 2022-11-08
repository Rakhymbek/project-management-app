import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBoard } from 'src/app/core/models/board.model';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private http: HttpClient) {}

  getAllBoards() {
    return this.http.get<IBoard[]>('boards');
  }
}
