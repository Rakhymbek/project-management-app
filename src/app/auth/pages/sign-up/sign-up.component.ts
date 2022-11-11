import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
import { AuthService } from '../../services/auth.service';
import { ISignInUserData, ISignUpUserData } from '../../models/user.model';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  hidePassword = true;

  hideConfirmPassword = true;

  constructor(
    private validator: ValidationService,
    public authService: AuthService,
    private userDataService: UserDataService,
  ) {}

  signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    login: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, this.validator.passwordValidator()]),
    confirmPassword: new FormControl('', [Validators.required, this.confirmPasswordMatching()]),
  });

  ngOnInit(): void {}

  private confirmPasswordMatching(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const { value } = control;
      if (!value) {
        return null;
      }
      const validPassword = value === this.password?.value;
      return !validPassword ? { confirmPassword: true } : null;
    };
  }

  get name() {
    return this.signUpForm.get('name');
  }

  get login() {
    return this.signUpForm.get('login');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  register() {
    const userData: ISignUpUserData = {
      name: this.name?.value!,
      login: this.login?.value!,
      password: this.password?.value!,
    };
    if (this.signUpForm.status === 'VALID') {
      this.authService.signUp(userData).subscribe(() => {
        this.authService
          .signIn({ login: userData.login, password: userData.password })
          .subscribe(({ token }: ISignInUserData) => {
            return this.userDataService.storeUserData(userData.login, token as string);
          });
      });
    }
  }
}
