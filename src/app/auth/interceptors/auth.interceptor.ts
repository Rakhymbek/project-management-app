import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<string>, next: HttpHandler): Observable<HttpEvent<string>> {
    const token = this.authService.getAuthToken();

    if (request.url.includes('./assets')) {
      return next.handle(request);
    }
    const req = request.clone({
      url: `${environment.API_URL}/${request.url}`,
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });

    return next.handle(req).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.authService.authErrorMessage = 'Authorization failed!';
          }
          if (err.status === 403) {
            this.authService.authErrorMessage = 'User was not founded!';
          }
        }
        return throwError(err);
      }),
    );
  }
}
