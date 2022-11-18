import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColumnDialogOptions, IBoardData, ITaskData } from 'src/app/core/models/board.model';
import { BoardService } from 'src/app/core/services/board.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  @Input() board: IBoardData | undefined;

  @Input() id: string | undefined;

  constructor(private activatedRoute: ActivatedRoute, private boardService: BoardService) {}

  ngOnInit(): void {}

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

  protected openDialog(event: string) {
    console.log(event);
    // const options: ColumnDialogOptions = {
    //   width: '300px',
    //   data: { event, element: BoardElements.column, boardId: this.id! },
    // };
    // const dialogRef = this.getDialogRef(event, options);
    // dialogRef.afterClosed().subscribe((value) => {
    //   console.log(value);
    //   if (value.event === EDialogEvents.create) {
    //     // this.createBoard(value);
    //     console.log(event);
    //   } else if (value.event === EDialogEvents.delete) {
    //     // this.deleteBoard(value);
    //     console.log(event);
    //   } else if (value.event === EDialogEvents.edit) {
    //     // this.editBoard(value);
    //     console.log(event);
    //   }
    // });
  }

  private getDialogRef(event: string, options: ColumnDialogOptions) {
    console.log(event, options);
  }
}
