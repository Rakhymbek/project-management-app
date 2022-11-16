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
        this.board = this.sortByOrder(tasks, this.boardData);
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
    this.updateTask(event);
  }

  private updateTask(event: CdkDragDrop<ITaskData[]>): void {
    const task = event.container.data[event.currentIndex];
    const prevColumnId = event.previousContainer.id;
    const columnId = event.container.id;
    if (this.id) {
      const body = {
        title: task.title,
        description: task.description,
        order: event.currentIndex + 1,
        userId: task.userId,
        boardId: this.id,
        columnId,
      };
      this.boardService.updateTask(this.id, prevColumnId, task.id, body).subscribe();
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
    this.updateColumn(event);
  }

  private updateColumn(event: CdkDragDrop<IColumnData[] | undefined>): void {
    const column = event.container.data![event.currentIndex];
    const order = event.currentIndex + 1;
    const title = column.title;
    if (this.id) {
      this.boardService.updateColumn(this.id, column.id, { title, order }).subscribe();
    }
  }

  ngOnDestroy(): void {
    this.$taskData?.unsubscribe();
  }

  private sortByOrder(tasks: ITaskData[], board: IBoardData | undefined): IBoardData | undefined {
    board?.columns.forEach((column) => {
      column.tasks.map((item) => {
        return (item = tasks.filter((task) => item.id === task.id)[0]);
      });
    });
    board?.columns.sort((a, b) => a.order - b.order);
    board?.columns.forEach((column) => {
      column.tasks.sort((a, b) => a.order - b.order);
    });
    return board;
  }

  protected openDialog(column: IColumnData) {
    console.log(column);
  }
}
