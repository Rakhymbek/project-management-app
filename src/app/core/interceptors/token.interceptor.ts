import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DialogErrorComponent } from '../components/dialog-error/dialog-error.component';
import { DialogErrorData } from '../models/board.model';
import { EStorage } from '../models/enums';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogErrorComponent,
    private authService: AuthService,
  ) {}

  intercept(req: HttpRequest<string>, next: HttpHandler) {
    const token = localStorage.getItem(EStorage.token);
    const options = {
      headers: req.headers.set('Authorization', token ? `Bearer ${token}` : ''),
      url: `${environment.API_URL}/${req.url}`,
    };
    if (req.url.includes('./assets/')) options.url = req.url;
    return next.handle(req.clone(options)).pipe(
      catchError((error: HttpErrorResponse) => {
        const data: DialogErrorData = {
          code: error.status,
        };
        this.dialog.open(DialogErrorComponent, { data });
        if (error.status === 401) {
          this.authService.authErrorMessage = 'Authorization failed!';
        }
        if (error.status === 403) {
          this.authService.authErrorMessage = 'User was not founded!';
        }
        if (error.status === 409) {
          this.authService.authErrorMessage = 'User login already exists!';
        }
        return throwError(() => error.message);
      }),
    );
  }
}
