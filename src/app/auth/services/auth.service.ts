import { Injectable } from '@angular/core';
import { ISignInUserData, ISignUpUserData, IUserData } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EStorage } from 'src/app/core/models/enums';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authErrorStatus: number | string = '';

  signUpFormName: string = '';

  constructor(private http: HttpClient) {}

  signUp(userData: ISignUpUserData) {
    return this.http.post<ISignUpUserData>(`signup`, userData);
  }

  signIn(userData: ISignInUserData) {
    return this.http.post<ISignUpUserData>('signin', userData);
  }

  updateUser(userData: ISignUpUserData, id: string) {
    return this.http.put<ISignUpUserData>(`users/${id}`, userData);
  }

  deleteUser(id: string) {
    return this.http.delete(`users/${id}`);
  }

  getAllUsers(): Observable<IUserData[]> {
    return this.http.get<IUserData[]>('users');
  }

  getAuthToken(): string | null {
    const user = localStorage.getItem(EStorage.userData);
    return user ? JSON.parse(user!).token : '';
  }

  isAuthorized(): boolean {
    return !!this.getAuthToken();
  }
}
