import { Injectable } from '@angular/core';
import { ISignInUserData, ISignUpUserData, IUserData } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(userData: ISignUpUserData) {
    return this.http.post<ISignUpUserData>(`signup`, userData);
  }

  signIn(userData: ISignInUserData) {
    return this.http.post<ISignUpUserData>('signin', userData);
  }

  getAuthToken(): string | null {
    return localStorage.getItem('userToken');
  }

  getAllUsers(): Observable<IUserData[]> {
    return this.http.get<IUserData[]>('users');
  }
}
