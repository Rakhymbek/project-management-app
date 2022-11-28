import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent {
  signUpForm = new FormControl('', [Validators.required, Validators.minLength(4)]);

  constructor(private router: Router, private authService: AuthService) {}

  get name() {
    return this.signUpForm.value;
  }

  public signUp(): void {
    if (this.signUpForm.valid) {
      this.authService.signUpFormName = this.name!;
      this.router.navigate(['/auth']);
    }
  }
}
