import { Injectable } from '@angular/core';
import { forkJoin, map, mergeMap, Observable, switchMap } from 'rxjs';
import { ITaskData, IUser } from '../models/board.model';
import { BoardService } from './board.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public tasks: ITaskData[] | undefined;

  public users: IUser[] | undefined;

  constructor(private boardService: BoardService) {
    this.init();
  }

  init() {
    this.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  private getUsers(tasks: ITaskData[]): Observable<ITaskData[]> {
    return this.boardService.getAllUsers().pipe(
      map((users) => {
        tasks.forEach((task) => {
          users.forEach((user) => {
            if (task.userId === user.id) {
              task.userName = user.name;
            }
          });
        });
        return tasks;
      }),
    );
  }

  private getBoard(boardId: string) {
    return this.boardService.getBoard(boardId).pipe(
      map((boards) =>
        boards.columns
          .map((column) => {
            column.tasks.forEach((task) => (task.boardId = boardId));
            return column.tasks;
          })
          .flat(),
      ),
    );
  }

  private getTasks(): Observable<ITaskData[] | undefined> {
    return this.boardService.getAllBoards().pipe(
      map((boards) => boards.map((board) => this.getBoard(board.id!))),
      switchMap(($tasks) => forkJoin($tasks)),
      map((tasks) => {
        return this.getUsers(tasks.flat());
      }),
      mergeMap(($tasks) => forkJoin($tasks)),
      map((tasks) => tasks.flat()),
    );
  }
}
