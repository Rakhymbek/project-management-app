import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private readonly url = 'https://creepy-catacombs-89955.herokuapp.com/';

  intercept(req: HttpRequest<string>, next: HttpHandler) {
    const token = localStorage.getItem('token');
    const reqClone = req.clone({
      headers: req.headers.set('Authorization', token ? `Bearer ${token}` : ''),
      url: this.url + req.url,
    });
    return next.handle(reqClone);
  }
}
