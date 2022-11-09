import { Component, Input, OnInit } from '@angular/core';
import { IBoard } from 'src/app/core/models/board.model';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss'],
})
export class BoardsListComponent implements OnInit {
  @Input() boards: IBoard[] | undefined;

  ngOnInit(): void {}
}
