import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDeleteComponent } from 'src/app/core/components/dialog-delete/dialog-delete.component';
import {
  IColumnData,
  ITask,
  ITaskData,
  TaskDialogCreateData,
  TaskDialogDeleteData,
  TaskDialogOptions,
} from 'src/app/core/models/board.model';
import { BoardElements, EDialogEvents } from 'src/app/core/models/enums';
import { BoardService } from 'src/app/core/services/board.service';
import { SearchService } from 'src/app/core/services/search.service';
import { DialogTaskComponent } from '../dialog-task/dialog-task.component';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  @Input() column: IColumnData | undefined;

  @Input() boardId: string | undefined;

  @Output() deleteColumn: EventEmitter<string> = new EventEmitter();

  @Output() editColumn: EventEmitter<string> = new EventEmitter();

  public editing: boolean = false;

  public title = new FormControl('', [
    Validators.minLength(3),
    Validators.maxLength(10),
    Validators.required,
  ]);

  constructor(
    private boardService: BoardService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogTaskComponent,
    private searchService: SearchService,
  ) {}

  ngOnInit(): void {
    this.title.setValue(this.column?.title || '');
  }

  get columnTitle(): string | null {
    return this.title.value;
  }

  protected dropTask(event: CdkDragDrop<ITaskData[] | undefined>): void {
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
      if (event && event.container.data) {
        this.updateTask(event);
      }
    }
  }

  private updateTask(event: CdkDragDrop<ITaskData[] | undefined>): void {
    if (event.container.data) {
      const task = event.container.data[event.currentIndex];
      const prevColumnId = event.previousContainer.id;
      const columnId = event.container.id;
      if (this.boardId) {
        const body = {
          title: task.title,
          description: task.description,
          order: event.currentIndex + 1,
          userId: task.userId,
          boardId: this.boardId,
          columnId,
        };
        this.boardService.updateTask(this.boardId, prevColumnId, task.id, body).subscribe();
      }
    }
  }

  protected openDialog(event: string, task?: ITaskData): void {
    const data = {
      event,
      element: BoardElements.task,
      boardId: this.boardId!,
      columnId: this.column?.id!,
      order: task?.order,
      title: task?.title,
      description: task?.description,
      userName: task?.userName,
      userId: task?.userId,
      id: task?.id,
    };

    const options: TaskDialogOptions = {
      width: '300px',
      data,
    };
    const dialogRef = this.getDialogRef(event, options);
    dialogRef.afterClosed().subscribe((value) => {
      if (value) {
        if (value.event === EDialogEvents.create) {
          this.createTask(value);
        } else if (value.event === EDialogEvents.delete) {
          this.deleteTask(value);
        } else if (value.event === EDialogEvents.edit) {
          this.editTask(value);
        }
      }
    });
  }

  private getDialogRef(
    event: string,
    options: TaskDialogOptions,
  ): MatDialogRef<DialogDeleteComponent | DialogTaskComponent, any> {
    if (event === EDialogEvents.delete) {
      return this.dialog.open(DialogDeleteComponent, options);
    } else {
      return this.dialog.open(DialogTaskComponent, options);
    }
  }

  protected editColumnTitle(): void {
    if (this.boardId && this.column?.id && this.columnTitle) {
      this.boardService
        .updateColumn(this.boardId, this.column?.id, {
          title: this.columnTitle,
          order: this.column.order,
        })
        .subscribe();
    }
  }

  private createTask(data: TaskDialogCreateData) {
    const body: ITask = {
      title: data.title,
      description: data.description,
      userId: data.userId,
    };
    this.boardService.createTask(data.boardId, data.columnId, body).subscribe((task) => {
      task.userName = data.userName;
      this.column?.tasks?.push(task);
      this.searchService.tasks = this.column?.tasks;
    });
  }

  private deleteTask(data: TaskDialogDeleteData) {
    this.boardService.deleteTask(data.boardId, data.columnId, data.id!).subscribe(() => {
      if (this.column) {
        this.column.tasks = this.column?.tasks.filter((item) => item.id !== data.id);
        this.searchService.tasks = this.column?.tasks;
      }
    });
  }

  private editTask(data: TaskDialogCreateData) {
    const body = {
      boardId: data.boardId,
      columnId: data.columnId,
      userId: data.userId,
      order: data.order,
      title: data.title,
      description: data.description,
    };
    this.boardService.updateTask(data.boardId, data.columnId, data.id, body).subscribe((task) => {
      const tasks = this.column?.tasks;
      task.userName = data.userName;
      const idx = tasks?.findIndex((item) => item.id === task.id);
      if (idx !== undefined && tasks) {
        tasks[idx] = task;
        this.searchService.tasks = tasks;
      }
    });
  }
}
