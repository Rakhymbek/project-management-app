import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser, TaskDialogCreateData } from 'src/app/core/models/board.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardService } from 'src/app/core/services/board.service';
import { EDialogEvents } from 'src/app/core/models/enums';

@Component({
  selector: 'app-dialog-task',
  templateUrl: './dialog-task.component.html',
  styleUrls: ['./dialog-task.component.scss'],
})
export class DialogTaskComponent implements OnInit {
  public users: IUser[] = [];

  public form: FormGroup = new FormGroup({
    title: new FormControl({ value: this.data.title, disabled: false }, [
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    description: new FormControl({ value: this.data.description, disabled: false }, [
      Validators.minLength(3),
      Validators.maxLength(40),
    ]),
    user: new FormControl({ name: this.data.userName, id: this.data.userId }, [
      Validators.required,
    ]),
  });

  constructor(
    public dialog: MatDialogRef<DialogTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogCreateData,
    private boardService: BoardService,
  ) {}

  ngOnInit(): void {
    this.boardService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

  protected getData(): void {
    this.data.userName = this.form.value.user.name;
    this.data.userId = this.form.value.user.id;
    this.data.title = this.form.value.title;
    this.data.description = this.form.value.description;
    this.dialog.close(this.data);
  }

  protected cancel(): void {
    this.dialog.close({ event: EDialogEvents.cancel });
  }

  protected compareWith(value: IUser, option: IUser): boolean {
    return value.name === option.name;
  }
}
