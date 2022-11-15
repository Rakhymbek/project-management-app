import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap, Observable, pluck } from 'rxjs';
import { ITask, IBoardData, ITaskData } from 'src/app/core/models/board.model';
import { BoardService } from '../../../core/services/board.service';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {
  public $id: Observable<string> = this.activatedRoute.params.pipe(pluck('id'));

  public id: string | undefined;

  public board: IBoardData | undefined;

  constructor(private activatedRoute: ActivatedRoute, private boardService: BoardService) {}

  ngOnInit(): void {
    this.$id
      .pipe(
        mergeMap((id) => {
          this.id = id;
          return this.getBoard(id);
        }),
      )
      .subscribe((columns) => {
        this.board = columns;
        console.log(columns);
      });
  }

  private getBoard(id: string) {
    return this.boardService.getBoard(id);
  }

  protected getUserName(task: ITask): Observable<ITask> {
    return this.boardService.getUser(task.id).pipe(
      map((user) => {
        task.userName = user.name;
        return task;
      }),
    );
  }

  drop(event: CdkDragDrop<ITaskData[]>): void {
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
  }
}
