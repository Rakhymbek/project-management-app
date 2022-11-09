import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  // intercept(request: HttpRequest<string>, next: HttpHandler): Observable<HttpEvent<string>> {
  // const token = this.authService.getAuthToken();
  //
  // if (token) {
  //   request = request.clone({
  //     setHeaders: { Authorization: `Authorization token ${token}` },
  //   });
  // }
  // console.log(request.url)
  //
  // return next.handle(request).pipe(
  //   catchError((err) => {
  //     if (err instanceof HttpErrorResponse) {
  //       if (err.status === 401) {
  //       }
  //     }
  //     return throwError(err);
  //   }),
  // );
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('./assets'))
      return next.handle(
        request.clone({
          url: request.url,
        }),
      );
    return next.handle(
      request.clone({
        url: `${environment.API_URL}/${request.url}`,
        headers: request.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`),
      }),
    );
  }
}
