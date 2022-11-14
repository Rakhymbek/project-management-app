import { Component, Input, OnInit } from '@angular/core';
import { ITaskData } from 'src/app/core/models/board.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() task: ITaskData | undefined;

  ngOnInit(): void {}
}
