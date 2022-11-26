import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: SignUpComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'edit-user',
    component: EditUserComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
