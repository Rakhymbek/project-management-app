import { Component, Inject, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
import { UserDataService } from '../../services/user-data.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogDeleteData, DialogOptions } from '../../../core/models/common.model';
import { DialogDeleteComponent } from '../../../core/components/dialog-delete/dialog-delete.component';
import { EDialogEvents, UserEdit } from '../../../core/models/enums';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnDestroy {
  hidePassword = true;

  constructor(
    private validator: ValidationService,
    public authService: AuthService,
    private userDataService: UserDataService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public userId: string,
  ) {}

  editUserForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    login: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, this.validator.passwordValidator()]),
  });

  get name() {
    return this.editUserForm.get('name');
  }

  get login() {
    return this.editUserForm.get('login');
  }

  get password() {
    return this.editUserForm.get('password');
  }

  saveChanges() {
    const userId = this.userDataService.getUserDataId();
    const token = this.authService.getAuthToken();
    const userData = {
      name: this.name?.value!,
      login: this.login?.value!,
      password: this.password?.value!,
    };
    this.authService.updateUser(userData, userId).subscribe((data) => {
      return this.userDataService.storeUserData(data.login, token as string);
    });
  }

  public openDialog(event: string): void {
    const userId = this.userDataService.getUserDataId();
    const options: DialogOptions = {
      width: '300px',
      data: { event, element: UserEdit.account, id: userId },
    };
    const dialogRef = this.getDialogRef(options);
    dialogRef.afterClosed().subscribe((value) => {
      if (value.event === EDialogEvents.delete) {
        this.deleteUserProfile(value);
      }
    });
  }

  private deleteUserProfile(data: DialogDeleteData): void {
    this.authService.deleteUser(data.id).subscribe();
    this.userDataService.removeUserData();
  }

  private getDialogRef(options: DialogOptions): MatDialogRef<DialogDeleteComponent> {
    return this.dialog.open(DialogDeleteComponent, options);
  }

  ngOnDestroy(): void {
    this.authService.authErrorStatus = '';
  }
}
