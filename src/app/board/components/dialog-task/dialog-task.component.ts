import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogCreateData, IUser } from 'src/app/core/models/board.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-task',
  templateUrl: './dialog-task.component.html',
  styleUrls: ['./dialog-task.component.scss'],
})
export class DialogTaskComponent implements OnInit {
  public users: IUser[] = [];

  public form = new FormGroup({
    title: new FormControl('', [Validators.minLength(3), Validators.maxLength(15)]),
    description: new FormControl('', [Validators.minLength(3), Validators.maxLength(40)]),
    users: new FormControl('', [Validators.required]),
  });

  constructor(
    public dialog: MatDialogRef<DialogTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogCreateData,
  ) {}

  ngOnInit(): void {}
}
