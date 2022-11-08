import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(private router: Router) {}

  get email() {
    return this.emailFormControl.value;
  }

  ngOnInit(): void {}

  public signUp(): void {
    if (this.emailFormControl.valid) {
      this.router.navigate(['/auth']);
      console.log(this.email);
    }
  }
}
