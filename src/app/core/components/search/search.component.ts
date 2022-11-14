import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  forkJoin,
  map,
  mergeMap,
  Observable,
  switchMap,
} from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ITaskData } from '../../models/board.model';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  search = new FormControl('');

  $filteredOptions: Observable<ITaskData[] | undefined> | undefined;

  constructor(
    private router: Router,
    private boardService: BoardService,
    protected auth: AuthService,
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    if (this.auth.isAuthorized()) {
      this.$filteredOptions = this.search.valueChanges.pipe(
        debounceTime(800),
        distinctUntilChanged(),
        switchMap((value) => this.getTasks(value || '')),
      );
    }
  }

  private filter(value: string, tasks: ITaskData[]): ITaskData[] | undefined {
    const filterValue = value.toLowerCase();
    return tasks?.filter((task) => {
      const data: (keyof ITaskData)[] = ['title', 'userName', 'description'];
      return data.some((item) => {
        return task[item]?.toString().toLowerCase().includes(filterValue);
      });
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

  public toBoard(task: ITaskData): void {
    this.router.navigate(['board', task.boardId]);
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

  private getTasks(value: string): Observable<ITaskData[] | undefined> {
    return this.boardService.getAllBoards().pipe(
      map((boards) => boards.map((board) => this.getBoard(board.id!))),
      switchMap(($board) => forkJoin($board)),
      map((arr) => {
        const tasks = arr.flat();
        return tasks.map((task) => this.getUser(task));
      }),
      mergeMap(($board) => forkJoin($board)),
      map((tasks) => {
        return this.filter(value, tasks);
      }),
    );
  }
}
