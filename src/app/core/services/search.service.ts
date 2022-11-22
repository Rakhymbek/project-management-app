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

  private getUser(task: ITaskData) {
    return this.boardService.getUser(task.userId).pipe(
      map((user) => {
        task.userName = user.name;
        return task;
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
      switchMap(($board) => forkJoin($board)),
      map((arr) => {
        const tasks = arr.flat();
        return tasks.map((task) => this.getUser(task));
      }),
      mergeMap(($board) => forkJoin($board)),
    );
  }
}
