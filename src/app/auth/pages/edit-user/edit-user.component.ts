import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent {
  hidePassword = true;

  constructor(
    private validator: ValidationService,
    public authService: AuthService,
    private userDataService: UserDataService,
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
}
