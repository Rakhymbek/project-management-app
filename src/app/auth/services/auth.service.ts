import { Injectable } from '@angular/core';
import { ISignInUserData, ISignUpUserData } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(userData: ISignUpUserData) {
    return this.http.post<ISignUpUserData>('/signup', userData);
  }

  signIn(userData: ISignInUserData) {
    return this.http.post<ISignUpUserData>('/signin', userData);
  }

  getAuthToken(): string | null {
    return localStorage.getItem('token');
  }
}
