import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, pluck } from 'rxjs';
import { IColumn, IColumnsData } from 'src/app/core/models/board.model';
import { BoardService } from '../../../core/services/board.service';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {
  public $id: Observable<string> = this.activatedRoute.params.pipe(pluck('id'));

  public columns: IColumn[] | undefined;

  constructor(private activatedRoute: ActivatedRoute, private boardService: BoardService) {}

  ngOnInit(): void {
    // this.$id.pipe(
    //   map((id) => this.getColumns(id)),
    //   switchMap(($columns) => forkJoin($columns)),
    //   switchMap((columns) => columns.flat().map()))
    // ).subscribe((columns) => {
    // this.columns = columns;
    // })
  }

  private getColumns(id: string) {
    return this.boardService.getAllColumns(id).pipe(
      map((columns) => {
        const data: IColumnsData = {
          boardId: id,
          columns,
        };
        return data;
      }),
    );
  }

  private getTasks(boardId: string, columnId: string) {
    return this.boardService.getAllTasks(boardId, columnId);
  }
}
