import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, map, mergeMap, Observable, pluck, Subscription } from 'rxjs';
import {
  ColumnDialogOptions,
  IBoardData,
  IColumnData,
  ITaskData,
  IUser,
} from 'src/app/core/models/board.model';
import { BoardService } from '../../../core/services/board.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogTaskComponent } from '../../components/dialog-task/dialog-task.component';
import { BoardElements, EDialogEvents } from 'src/app/core/models/enums';
import { DialogDeleteComponent } from 'src/app/core/components/dialog-delete/dialog-delete.component';
import { DialogColumnComponent } from '../../components/dialog-column/dialog-column.component';

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

  public users: IUser[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private boardService: BoardService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogTaskComponent,
  ) {}

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
        this.users.push(user);
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

  protected openDialog(event: string) {
    const options: ColumnDialogOptions = {
      width: '300px',
      data: { event, element: BoardElements.column, boardId: this.id! },
    };
    const dialogRef = this.getDialogRef(event, options);
    dialogRef.afterClosed().subscribe((value) => {
      console.log(value);
      // if (value.event === EDialogEvents.create) {
      //   // this.createBoard(value);
      //   console.log(event);
      // } else if (value.event === EDialogEvents.delete) {
      //   // this.deleteBoard(value);
      //   console.log(event);
      // } else if (value.event === EDialogEvents.edit) {
      //   // this.editBoard(value);
      //   console.log(event);
      // }
    });
  }

  private getDialogRef(
    event: string,
    options: ColumnDialogOptions,
  ): MatDialogRef<DialogDeleteComponent | DialogColumnComponent, any> {
    if (event === EDialogEvents.delete) {
      return this.dialog.open(DialogDeleteComponent, options);
    } else {
      return this.dialog.open(DialogColumnComponent, options);
    }
  }
}
