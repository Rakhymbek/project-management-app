import { Component, Inject, OnInit } from '@angular/core';
import {
  IBoard,
  DialogData,
  DialogOptions,
  DialogCreateData,
} from 'src/app/core/models/board.model';
import { MainService } from '../../services/main.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogCreateComponent } from '../../components/dialog-create/dialog-create.component';
import { EDialogEvents } from 'src/app/core/models/enums';
import { DialogComponent } from 'src/app/core/components/dialog/dialog.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  public boardTitle = '';

  public boardDescr = '';

  public boards: IBoard[] | undefined;

  constructor(
    private mainService: MainService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData | DialogCreateData,
  ) {
    this.mainService.getAllBoards().subscribe((allBoards) => (this.boards = allBoards));
  }

  ngOnInit(): void {}

  public openDialog(event: string, id?: string): void {
    const options: DialogOptions = { width: '300px' };
    const dialog = this.getDialog(event);
    if (id) options.data = { id };
    const dialogRef = this.dialog.open(dialog, options);
    dialogRef.afterClosed().subscribe((value) => {
      if (value.event === EDialogEvents.create) {
        this.createBoard(value);
      } else if (value.event === EDialogEvents.delete) {
        this.deleteBoard(value);
      }
    });
  }

  private createBoard(data: DialogCreateData): void {
    this.mainService.createBoard(data.title, data.description).subscribe((boards) => {
      this.boards?.push(boards);
    });
  }

  public deleteBoard(data: DialogData) {
    this.mainService.deleteBoard(data.id).subscribe(() => {
      this.boards = this.boards?.filter((item) => item.id !== data.id);
    });
  }

  getDialog(event: string): typeof DialogComponent | typeof DialogCreateComponent {
    switch (event) {
      case EDialogEvents.create:
        return DialogCreateComponent;
      case EDialogEvents.delete:
        return DialogComponent;
      case EDialogEvents.cancel:
        return DialogCreateComponent;
      default:
        return DialogComponent;
    }
  }
}
