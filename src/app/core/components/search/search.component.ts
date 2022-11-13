import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin, map, Observable, startWith, switchMap } from 'rxjs';
import { IBoard, IColumnsData, ITask } from '../../models/board.model';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  search = new FormControl('');

  $tasks: Observable<ITask[]> | undefined;

  tasks: ITask[] | undefined;

  filteredOptions: Observable<ITask[] | undefined> | undefined;

  constructor(private router: Router, private boardService: BoardService) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.filteredOptions = this.search.valueChanges.pipe(
      startWith(''),
      map((value) => (value ? this.filter(value || '') : this.tasks?.slice())),
    );
    this.$tasks = this.boardService.getAllBoards().pipe(
      map((boards) => boards.map((board) => this.getColumns(board))),
      switchMap(($columns) => forkJoin($columns)),
      map((data) => {
        return data
          .map((board) => board.columns.map((column) => this.getTasks(board.boardId!, column.id)))
          .flat();
      }),
      switchMap(($tasks) => forkJoin($tasks)),
      map((tasks) =>
        tasks.flat().map((task) => {
          return this.getUser(task.userId).pipe(
            map((user) => {
              task.userName = user;
              return task;
            }),
          );
        }),
      ),
      switchMap(($tasks) => forkJoin($tasks)),
    );
    this.$tasks?.subscribe((item: ITask[]) => {
      this.tasks = item;
    });
  }

  private filter(value: string): ITask[] | undefined {
    const filterValue = value.toLowerCase();
    return this.tasks?.filter((task) => {
      const data: (keyof ITask)[] = ['title', 'userName', 'description'];
      return data.some((item) => {
        return task[item]?.toString().toLowerCase().includes(filterValue);
      });
    });
  }

  private getColumns(board: IBoard): Observable<IColumnsData> {
    return this.boardService.getAllColumns(board.id!).pipe(
      map((columns) => {
        const data: IColumnsData = {
          boardId: board.id,
          columns,
        };
        return data;
      }),
    );
  }

  private getTasks(boardId: string, columnId: string): Observable<ITask[]> {
    return this.boardService.getAllTasks(boardId, columnId);
  }

  private getUser(id: string): Observable<string> {
    return this.boardService.getUser(id).pipe(map((user) => user.name));
  }

  public toBoard(task: ITask): void {
    this.router.navigate(['board', task.boardId]);
  }
}
