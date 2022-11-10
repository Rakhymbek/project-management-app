import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EStorage } from '../models/enums';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<string>, next: HttpHandler) {
    const token = localStorage.getItem(EStorage.token);
    const options = {
      headers: req.headers.set('Authorization', token ? `Bearer ${token}` : ''),
      url: `${environment.API_URL}/${req.url}`,
    };
    if (req.url.includes('./assets/')) options.url = req.url;
    return next.handle(req.clone(options));
  }
}
