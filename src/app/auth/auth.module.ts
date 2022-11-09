import { NgModule } from '@angular/core';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginPageComponent, SignUpComponent, EditUserComponent],
  imports: [SharedModule, AuthRoutingModule],
})
export class AuthModule {}
