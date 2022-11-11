import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, Subscriber, switchMap } from 'rxjs';
import { IUserData } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  public userName: string | undefined = '';

  constructor(private authService: AuthService, private router: Router) {
    this.userName = this.getUserName() || '';
  }

  getUserData(userLogin: string) {
    return new Observable((observer: Subscriber<IUserData>) => {
      this.authService
        .getAllUsers()
        .pipe(switchMap((usersData) => usersData.filter((user) => user.login === userLogin)))
        .subscribe((user) => {
          return observer.next(user);
        });
    });
  }

  storeUserTokenInLocal(token: string) {
    localStorage.setItem('userToken', token);
  }

  storeUserDataInLocal(userData: IUserData) {
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  getUserDataFromLocal(): IUserData {
    return JSON.parse(localStorage.getItem('userData')!);
  }

  getUserName() {
    return JSON.parse(localStorage.getItem('userData')!)?.login;
  }

  storeUserData(userName: string, token: string) {
    this.storeUserTokenInLocal(token);
    this.getUserData(userName).subscribe((userData) => {
      const storedData = {
        id: userData.id,
        name: userData.name,
        login: userData.login,
        isAuthorized: true,
      };
      this.storeUserDataInLocal(storedData);
      this.userName = this.getUserName();
      this.router.navigate(['/main']);
    });
  }

  removeUserData() {
    localStorage.removeItem('userData');
    localStorage.removeItem('userToken');
    this.userName = '';
    this.router.navigate(['/']);
  }
}
