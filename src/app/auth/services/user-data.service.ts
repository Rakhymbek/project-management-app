import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, Subscriber, switchMap } from 'rxjs';
import { IUserData } from '../models/user.model';
import { Router } from '@angular/router';
import { EStorage } from '../../core/models/enums';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  public userName: string | undefined = '';

  public storedData = {
    id: '',
    name: '',
    login: '',
    token: '',
  };

  constructor(private authService: AuthService, private router: Router) {
    this.userName = this.getUserName() || '';
  }

  getUserData(userLogin: string) {
    return new Observable((observer: Subscriber<IUserData>) => {
      this.authService
        .getAllUsers()
        .pipe(switchMap(async (usersData) => usersData.find((user) => user.login === userLogin)))
        .subscribe((user) => {
          return observer.next(user);
        });
    });
  }

  fillUserData(userData: IUserData): void {
    this.storedData.id = userData.id;
    this.storedData.name = userData.name;
    this.storedData.login = userData.login;
  }

  storeUserDataInLocal(userData: IUserData): void {
    localStorage.setItem(EStorage.userData, JSON.stringify(userData));
  }

  getUserDataId(): string {
    return JSON.parse(localStorage.getItem(EStorage.userData)!).id;
  }

  getUserName(): string {
    return JSON.parse(localStorage.getItem(EStorage.userData)!)?.name;
  }

  storeUserData(userName: string, token: string) {
    this.storedData.token = token;
    this.storeUserDataInLocal(this.storedData);
    this.getUserData(userName).subscribe((userData: IUserData) => {
      this.fillUserData(userData);
      this.storeUserDataInLocal(this.storedData);
      this.userName = this.getUserName();
      this.router.navigate(['/main']);
    });
  }

  removeUserData() {
    localStorage.removeItem(EStorage.userData);
    this.userName = '';
    this.router.navigate(['/']);
  }
}
