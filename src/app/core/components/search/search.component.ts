import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { forkJoin, map, Observable, startWith, switchMap } from 'rxjs';
import { IBoard, IColumnsData, ITask } from '../../models/board.model';
import { SearchService } from '../../services/search.service';

export interface State {
  flag: string;
  name: string;
  population: string;
}

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

  constructor(private searchService: SearchService) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.filteredOptions = this.search.valueChanges.pipe(
      startWith(''),
      map((value) => (value ? this.filter(value || '') : this.tasks?.slice())),
    );
    this.$tasks = this.searchService.getAllBoards().pipe(
      map((boards) => boards.map((board) => this.getColumns(board))),
      switchMap(($columns) => forkJoin($columns)),
      map((data) => {
        return data
          .map((board) => board.columns.map((column) => this.getTasks(board.boardId!, column.id)))
          .flat();
      }),
      switchMap(($tasks) => forkJoin($tasks)),
      switchMap((tasks) => forkJoin(tasks)),
      map((tasks) =>
        tasks.map((task) => {
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

  private filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.tasks?.filter((task) => {
      const data: (keyof ITask)[] = ['title', 'userName', 'description'];
      return data.some((item) => {
        return task[item]?.toString().toLowerCase().includes(filterValue);
      });
    });
  }

  private getColumns(board: IBoard) {
    return this.searchService.getAllColumns(board.id!).pipe(
      map((columns) => {
        const data: IColumnsData = {
          boardId: board.id,
          columns,
        };
        return data;
      }),
    );
  }

  private getTasks(boardId: string, columnId: string) {
    return this.searchService.getAllTasks(boardId, columnId);
  }

  private getUser(id: string) {
    return this.searchService.getUser(id).pipe(map((user) => user.name));
  }
}
