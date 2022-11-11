import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
import { AuthService } from '../../services/auth.service';
import { ISignInUserData } from '../../models/user.model';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  hide = true;

  constructor(
    private validator: ValidationService,
    public authService: AuthService,
    private userDataService: UserDataService,
  ) {}

  loginForm = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, this.validator.passwordValidator()]),
  });

  get login() {
    return this.loginForm.get('login');
  }

  get password() {
    return this.loginForm.get('password');
  }

  toSignIn() {
    if (this.loginForm.valid) {
      const userData: ISignInUserData = {
        login: this.login?.value!,
        password: this.password?.value!,
      };
      this.authService.signIn(userData).subscribe(({ token }: ISignInUserData) => {
        return this.userDataService.storeUserData(userData.login, token as string);
      });
    }
  }
}
