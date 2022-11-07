import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boards-item',
  templateUrl: './boards-item.component.html',
  styleUrls: ['./boards-item.component.scss'],
})
export class BoardsItemComponent implements OnInit {
  @Input() board: any;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toBoard() {
    this.router.navigate(['board', this.board.id]);
  }
}
