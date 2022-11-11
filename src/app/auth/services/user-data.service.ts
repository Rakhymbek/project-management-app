import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, Subscriber, switchMap } from 'rxjs';
import { IUserData } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(private authService: AuthService) {}

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
}
