import { Injectable } from '@angular/core';
import { ISignInUserData, ISignUpUserData, IUserData } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EStorage } from 'src/app/core/models/enums';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authErrorMessage: string = '';

  constructor(private http: HttpClient) {}

  signUp(userData: ISignUpUserData) {
    return this.http.post<ISignUpUserData>(`signup`, userData);
  }

  signIn(userData: ISignInUserData) {
    return this.http.post<ISignUpUserData>('signin', userData);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(EStorage.token);
  }

  getAllUsers(): Observable<IUserData[]> {
    return this.http.get<IUserData[]>('users');
  }

  isAuthorized(): boolean {
    return !!this.getAuthToken();
  }
}
