import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, map, mergeMap, Observable, of, pluck, Subscription } from 'rxjs';
import {
  ColumnDialogCreateData,
  ColumnDialogDeleteData,
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
          return this.getTasksWithUser(board);
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

  private getTasksWithUser(board: IBoardData): Observable<ITaskData>[][] {
    if (board.columns.length !== 0) {
      return board.columns.map((column) => {
        if (column.tasks.length !== 0) {
          const tasksWithUser = column.tasks.map((task) => {
            return this.boardService.getUser(task.userId).pipe(
              map((user) => {
                this.users.push(user);
                task.userName = user.name;
                return task;
              }),
            );
          });
          return tasksWithUser;
        } else {
          return [of({} as ITaskData)];
        }
      });
    } else {
      return [[of({} as ITaskData)]];
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

  protected openDialog(event: string, columnId?: string) {
    const options: ColumnDialogOptions = {
      width: '300px',
      data: { event, element: BoardElements.column, boardId: this.id!, id: columnId },
    };
    const dialogRef = this.getDialogRef(event, options);
    dialogRef.afterClosed().subscribe((value) => {
      if (value) {
        if (value.event === EDialogEvents.create) {
          this.createColumn(value);
        } else if (value.event === EDialogEvents.delete) {
          this.deleteColumn(value);
        }
      }
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

  private createColumn(data: ColumnDialogCreateData): void {
    this.boardService.createColumn(data.boardId, { title: data.title }).subscribe((column) => {
      column.tasks = [];
      this.board?.columns?.push(column);
    });
  }

  private deleteColumn(data: ColumnDialogDeleteData): void {
    this.boardService.deleteColumn(this.board?.id!, data.id!).subscribe(() => {
      if (this.board) {
        this.board.columns = this.board?.columns.filter((item) => item.id !== data.id);
      }
    });
  }
}
