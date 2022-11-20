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
    title: new FormControl('', [Validators.minLength(3), Validators.maxLength(10)]),
    description: new FormControl('', [Validators.minLength(3), Validators.maxLength(40)]),
    user: new FormControl('', [Validators.required]),
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

  getData(): void {
    const data: TaskDialogCreateData = {
      event: this.data.event,
      boardId: this.data.boardId,
      columnId: this.data.columnId,
      description: this.form.value.description,
      userId: this.form.value.user.userId,
      userName: this.form.value.user.userName,
      title: this.form.value.title,
      id: this.data.id,
    };
    this.dialog.close(data);
  }

  cancel(): void {
    this.dialog.close({ event: EDialogEvents.cancel });
  }
}
