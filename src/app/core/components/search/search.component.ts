import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ITaskData } from '../../models/board.model';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  searchField = new FormControl('');

  $filteredOptions: Observable<ITaskData[] | undefined> | undefined;

  constructor(private router: Router, protected auth: AuthService, private search: SearchService) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    if (this.auth.isAuthorized()) {
      this.$filteredOptions = this.searchField.valueChanges.pipe(
        debounceTime(800),
        distinctUntilChanged(),
        switchMap((value) => of(this.getTasks(value || ''))),
      );
    }
    this.$filteredOptions?.subscribe((value) => {
      this.search.filteredTasks = value;
      localStorage.setItem('filteredTasks', JSON.stringify(this.search.filteredTasks));
    });
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

  public toBoard(task: ITaskData): void {
    this.router.navigate(['board', task.boardId]);
  }

  private getTasks(value: string): ITaskData[] | undefined {
    const tasks = this.search.tasks;
    if (tasks) {
      return this.filter(value, tasks);
    }
    return tasks;
  }

  public onSearchSubmit() {
    this.router.navigate(['main', 'search']);
  }
}
