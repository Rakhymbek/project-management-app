import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDeleteData } from '../../models/board.model';
import { EDialogEvents } from '../../models/enums';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.scss'],
})
export class DialogDeleteComponent implements OnInit {
  public element = `main.dialog.delete.${this.data.element}`;

  constructor(
    public dialog: MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDeleteData,
  ) {}

  ngOnInit(): void {}

  public cancel(): void {
    this.dialog.close({ event: EDialogEvents.cancel });
  }

  public getData(): void {
    this.dialog.close({
      event: EDialogEvents.delete,
      id: this.data.id,
    });
  }

  private getMessage() {}
}
