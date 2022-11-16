import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, map, mergeMap, Observable, pluck, Subscription } from 'rxjs';
import { IBoardData, IColumnData, ITaskData } from 'src/app/core/models/board.model';
import { BoardService } from '../../../core/services/board.service';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit, OnDestroy {
  public $id: Observable<string> = this.activatedRoute.params.pipe(pluck('id'));

  public $taskData: Subscription | undefined;

  public id: string | undefined;

  public board: IBoardData | undefined;

  public boardData: IBoardData | undefined;

  constructor(private activatedRoute: ActivatedRoute, private boardService: BoardService) {}

  ngOnInit(): void {
    this.$taskData = this.$id
      .pipe(
        mergeMap((id) => {
          this.id = id;
          return this.getBoard(id);
        }),
        map((board) => {
          this.boardData = board;
          return board.columns.map((column) =>
            column.tasks.map((task) => {
              return this.getUserName(task);
            }),
          );
        }),
        map(($tasks) => $tasks.flat()),
        mergeMap(($tasks) => forkJoin($tasks)),
      )
      .subscribe((tasks) => {
        this.boardData?.columns.forEach((column) => {
          column.tasks.forEach((item) => {
            item = tasks.filter((task) => item.id === task.id)[0];
          });
        });
        this.board = this.boardData;
      });
  }

  private getBoard(id: string) {
    return this.boardService.getBoard(id);
  }

  protected getUserName(task: ITaskData): Observable<ITaskData> {
    return this.boardService.getUser(task.userId).pipe(
      map((user) => {
        task.userName = user.name;
        return task;
      }),
    );
  }

  protected drop(event: CdkDragDrop<ITaskData[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  protected dropColumn(event: CdkDragDrop<IColumnData[] | undefined>): void {
    if (event.container.data && event.previousContainer.data) {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      }
    }
  }

  ngOnDestroy(): void {
    this.$taskData?.unsubscribe();
  }
}
