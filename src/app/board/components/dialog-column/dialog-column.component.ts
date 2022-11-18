import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColumnDialogCreateData } from 'src/app/core/models/board.model';
import { EDialogEvents } from 'src/app/core/models/enums';

@Component({
  selector: 'app-dialog-column',
  templateUrl: './dialog-column.component.html',
  styleUrls: ['./dialog-column.component.scss'],
})
export class DialogColumnComponent implements OnInit {
  public form = new FormGroup({
    title: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(10),
      Validators.required,
    ]),
  });

  constructor(
    public dialog: MatDialogRef<DialogColumnComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ColumnDialogCreateData,
  ) {}

  ngOnInit(): void {}

  getData() {
    this.dialog.close({
      event: this.data.event,
      boardId: this.data.boardId,
      title: this.form.value.title,
    });
  }

  cancel(): void {
    this.dialog.close({ event: EDialogEvents.cancel });
  }
}
