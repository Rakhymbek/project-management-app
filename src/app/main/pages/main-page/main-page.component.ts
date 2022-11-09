import { Component, Inject, OnInit } from '@angular/core';
import { IBoard } from 'src/app/core/models/board.model';
import { MainService } from '../../services/main.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogCreateComponent } from '../../components/dialog-create/dialog-create.component';
import { DialogData } from '../../models/border.model';
import { EDialogEvents } from 'src/app/core/models/enums';

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
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.mainService.getAllBoards().subscribe((allBoards) => (this.boards = allBoards));
  }

  ngOnInit(): void {}

  public openDialog(): void {
    const dialogRef = this.dialog.open(DialogCreateComponent, {
      width: '300px',
      data: { title: this.boardTitle, description: this.boardDescr },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data.event === EDialogEvents.create) {
        this.createBoard(data);
      }
    });
  }

  private createBoard(data: DialogData): void {
    this.mainService.createBoard(data.title, data.description).subscribe((boards) => {
      this.boards?.push(boards);
    });
  }
}
