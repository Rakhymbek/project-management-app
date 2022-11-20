import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToasterComponent } from '../components/toaster/toaster.component';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private snackBar: MatSnackBar) {}

  openErrorToaster(message: string) {
    this.snackBar.openFromComponent(ToasterComponent, {
      horizontalPosition: 'end',
      panelClass: ['red-snackbar', 'snackbar'],
      duration: 3000,
      data: message,
    });
  }

  openSuccessfulToaster(message: string) {
    this.snackBar.openFromComponent(ToasterComponent, {
      duration: 3000,
      horizontalPosition: 'end',
      panelClass: ['green-snackbar', 'snackbar'],
      data: message,
    });
  }
}
