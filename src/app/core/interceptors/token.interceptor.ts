import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DialogErrorComponent } from '../components/dialog-error/dialog-error.component';
import { DialogErrorData } from '../models/board.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ToasterService } from '../services/toaster.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogErrorComponent,
    private authService: AuthService,
    private toaster: ToasterService,
  ) {}

  intercept(req: HttpRequest<string>, next: HttpHandler) {
    const token = this.authService.getAuthToken();
    const options = {
      headers: req.headers.set('Authorization', token ? `Bearer ${token}` : ''),
      url: `${environment.API_URL}/${req.url}`,
    };
    if (req.url.includes('./assets/')) options.url = req.url;
    return next.handle(req.clone(options)).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        this.authService.authErrorStatus = error.status;
        const data: DialogErrorData = {
          code: error.status,
        };
        this.toaster.openErrorToaster(`error.${data.code}`);
        return throwError(() => error.message);
      }),
    );
  }
}
