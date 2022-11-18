import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IColumnData, ITaskData } from 'src/app/core/models/board.model';
import { EDialogEvents } from 'src/app/core/models/enums';
import { BoardService } from 'src/app/core/services/board.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  @Input() column: IColumnData | undefined;

  @Input() id: string | undefined;

  @Output() deleteColumn: EventEmitter<string> = new EventEmitter();

  @Output() editColumn: EventEmitter<string> = new EventEmitter();

  constructor(private activatedRoute: ActivatedRoute, private boardService: BoardService) {}

  ngOnInit(): void {}

  protected drop(event: CdkDragDrop<ITaskData[] | undefined>): void {
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
  }

  protected openDialog(event: string) {
    if (event === EDialogEvents.delete) {
      this.deleteColumn.emit(this.column!.id);
    }
  }
}
