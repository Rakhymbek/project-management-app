import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../models/board.model';
import { EDialogEvents } from '../../models/enums';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  ngOnInit(): void {}

  constructor(
    public dialog: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  cancel(): void {
    this.dialog.close({ event: EDialogEvents.cancel });
  }

  getData(): void {
    this.dialog.close({
      event: EDialogEvents.delete,
      id: this.data.id,
    });
  }
}
