import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/core/models/board.model';
import { EDialogEvents } from 'src/app/core/models/enums';

@Component({
  selector: 'app-dialog-create',
  templateUrl: './dialog-create.component.html',
  styleUrls: ['./dialog-create.component.scss'],
})
export class DialogCreateComponent implements OnInit {
  public form = new FormGroup({
    title: new FormControl('', [Validators.minLength(3), Validators.maxLength(15)]),
    description: new FormControl('', [Validators.minLength(3), Validators.maxLength(40)]),
  });

  constructor(
    public dialog: MatDialogRef<DialogCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  ngOnInit(): void {}

  cancel(): void {
    this.dialog.close({ event: EDialogEvents.cancel });
  }

  getData(): void {
    this.dialog.close({
      event: EDialogEvents.create,
      title: this.form.value.title,
      description: this.form.value.description,
    });
  }
}
