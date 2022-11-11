import { Component, Inject, OnInit } from '@angular/core';
import {
  IBoard,
  DialogDeleteData,
  DialogOptions,
  DialogCreateData,
} from 'src/app/core/models/board.model';
import { MainService } from '../../services/main.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogCreateComponent } from '../../components/dialog-create/dialog-create.component';
import { BoardElements, EDialogEvents } from 'src/app/core/models/enums';
import { DialogDeleteComponent } from 'src/app/core/components/dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  public boards: IBoard[] | undefined;

  constructor(
    private mainService: MainService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogDeleteData | DialogCreateData,
  ) {
    this.mainService.getAllBoards().subscribe((allBoards) => (this.boards = allBoards));
  }

  ngOnInit(): void {}

  public openDialog(event: string, id?: string): void {
    const options: DialogOptions = {
      width: '300px',
      data: { event, element: BoardElements.board, id },
    };
    const dialogRef = this.getDialogRef(event, options);
    dialogRef.afterClosed().subscribe((value) => {
      if (value.event === EDialogEvents.create) {
        this.createBoard(value);
      } else if (value.event === EDialogEvents.delete) {
        this.deleteBoard(value);
      } else if (value.event === EDialogEvents.edit) {
        this.editBoard(value);
      }
    });
  }

  private createBoard(data: DialogCreateData): void {
    this.mainService.createBoard(data.title, data.description).subscribe((boards) => {
      this.boards?.push(boards);
    });
  }

  private deleteBoard(data: DialogDeleteData) {
    this.mainService.deleteBoard(data.id).subscribe(() => {
      this.boards = this.boards?.filter((item) => item.id !== data.id);
    });
  }

  private editBoard(data: DialogCreateData): void {
    this.mainService
      .updateBoard(data.id, {
        title: data.title,
        description: data.description,
      })
      .subscribe((board) => {
        const idx = this.boards?.findIndex((item) => item.id === board.id);
        if (idx && this.boards) {
          this.boards[idx] = board;
        }
      });
  }

  private getDialogRef(
    event: string,
    options: DialogOptions,
  ): MatDialogRef<DialogDeleteComponent | DialogCreateComponent, any> {
    if (event === EDialogEvents.delete) {
      return this.dialog.open(DialogDeleteComponent, options);
    } else {
      return this.dialog.open(DialogCreateComponent, options);
    }
  }
}
