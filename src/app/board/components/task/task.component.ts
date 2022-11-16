import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDeleteComponent } from 'src/app/core/components/dialog-delete/dialog-delete.component';
import { IColumnData, ITaskData, TaskDialogOptions } from 'src/app/core/models/board.model';
import { EDialogEvents } from 'src/app/core/models/enums';
import { BoardService } from 'src/app/core/services/board.service';
import { DialogTaskComponent } from '../dialog-task/dialog-task.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() task: ITaskData | undefined;

  @Input() column: IColumnData | undefined;

  constructor(
    private boardService: BoardService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogTaskComponent,
  ) {}

  ngOnInit(): void {}

  protected openDialog(event: string, column: IColumnData) {
    // const options: TaskDialogOptions = {
    //   width: '300px',
    //   data: { event, element: BoardElements.task, boardId: this.id!, columnId: column.id },
    // };
    // const dialogRef = this.getDialogRef(event, options);
    console.log(event, column);
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
}
