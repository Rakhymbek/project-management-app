import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IColumnData, ITaskData } from 'src/app/core/models/board.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() task: ITaskData | undefined;

  @Input() column: IColumnData | undefined;

  @Output() deleteTask = new EventEmitter<ITaskData>();

  ngOnInit(): void {}
}
