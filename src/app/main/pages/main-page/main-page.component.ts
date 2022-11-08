import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBoard } from 'src/app/core/models/board.model';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  public boards: Observable<IBoard[]> = this.mainService.getAllBoards();

  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    this.boards.subscribe((item) => console.log(item));
  }
}
