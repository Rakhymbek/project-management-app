import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { forkJoin, map, Observable, startWith, switchMap } from 'rxjs';
import { IBoard, IBoardData, ITaskData } from '../../models/board.model';
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
export class SearchComponent implements OnInit {
  search = new FormControl('');

  $columns: Observable<Observable<ITaskData>[]> | undefined;

  options = [
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg',
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg',
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg',
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg',
    },
  ];

  filteredOptions: Observable<State[]> | undefined;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.filteredOptions = this.search.valueChanges.pipe(
      startWith(''),
      map((value) => (value ? this.filter(value || '') : this.options.slice())),
    );
    this.$columns = this.searchService.getAllBoards().pipe(
      map((boards) => boards.map((board) => this.getColumns(board))),
      switchMap(($columns) => forkJoin(...$columns)),
      map((boardData) =>
        boardData.map((board) =>
          board.columns.map((column) => this.getTasks(board.boardId!, column.id)),
        ),
      ),
      switchMap(($tasks) => forkJoin(...$tasks)),
    );
    this.$columns?.subscribe((item) => console.log(item));
  }

  private filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) => option.name.toLowerCase().includes(filterValue));
  }

  public getColumns(board: IBoard) {
    return this.searchService.getAllColumns(board.id!).pipe(
      map((columns) => {
        const data: IBoardData = {
          boardId: board.id,
          columns,
        };
        return data;
      }),
    );
  }

  public getTasks(boardId: string, columnId: string) {
    return this.searchService.getAllTasks(boardId, columnId).pipe(
      map((task) => {
        const data: ITaskData = {
          boardId,
          columnId,
          task,
        };
        return data;
      }),
    );
  }
}
