import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogErrorData } from '../../models/board.model';

@Component({
  selector: 'app-dialog-error',
  templateUrl: './dialog-error.component.html',
  styleUrls: ['./dialog-error.component.scss'],
})
export class DialogErrorComponent implements OnInit {
  public message = `error.${this.data.code}`;

  constructor(
    public dialog: MatDialogRef<DialogErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogErrorData,
  ) {}

  ngOnInit(): void {}
}
