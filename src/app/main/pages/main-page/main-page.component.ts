import { Component, Inject } from '@angular/core';
import {
  BoardDialogDeleteData,
  BoardDialogOptions,
  BoardDialogCreateData,
} from 'src/app/core/models/board.model';
import { BoardService } from '../../../core/services/board.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogCreateComponent } from '../../components/dialog-create/dialog-create.component';
import { BoardElements, EDialogEvents } from 'src/app/core/models/enums';
import { DialogDeleteComponent } from 'src/app/core/components/dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  constructor(
    public boardService: BoardService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: BoardDialogDeleteData | BoardDialogCreateData,
  ) {
    this.boardService
      .getAllBoards()
      .subscribe((allBoards) => (this.boardService.boards = allBoards));
  }

  public openDialog(event: string, id?: string): void {
    const options: BoardDialogOptions = {
      width: '300px',
      data: { event, element: BoardElements.board, id },
    };
    const dialogRef = this.getDialogRef(event, options);
    dialogRef.afterClosed().subscribe((value) => {
      if (value) {
        if (value.event === EDialogEvents.create) {
          this.createBoard(value);
        } else if (value.event === EDialogEvents.delete) {
          this.deleteBoard(value);
        } else if (value.event === EDialogEvents.edit) {
          this.editBoard(value);
        }
      }
    });
  }

  private createBoard(data: BoardDialogCreateData): void {
    this.boardService.createBoard(data.title, data.description).subscribe((boards) => {
      this.boardService.boards?.push(boards);
    });
  }

  private deleteBoard(data: BoardDialogDeleteData): void {
    this.boardService.deleteBoard(data.id!).subscribe(() => {
      this.boardService.boards = this.boardService.boards?.filter((item) => item.id !== data.id);
    });
  }

  private editBoard(data: BoardDialogCreateData): void {
    this.boardService
      .updateBoard(data.id, {
        title: data.title,
        description: data.description,
      })
      .subscribe((board) => {
        const idx = this.boardService.boards?.findIndex((item) => item.id === board.id);
        if (idx !== undefined && this.boardService.boards) {
          this.boardService.boards[idx] = board;
        }
      });
  }

  private getDialogRef(
    event: string,
    options: BoardDialogOptions,
  ): MatDialogRef<DialogDeleteComponent | DialogCreateComponent, any> {
    if (event === EDialogEvents.delete) {
      return this.dialog.open(DialogDeleteComponent, options);
    } else {
      return this.dialog.open(DialogCreateComponent, options);
    }
  }
}
