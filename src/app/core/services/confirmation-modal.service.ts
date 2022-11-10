import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../components/confirmation-modal/confirmation-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationModalService {
  constructor(public dialog: MatDialog) {}

  openConfirmationModal(question: string, confirmationFunction: Function): void {
    this.dialog.open(ConfirmationModalComponent, {
      data: {
        question,
        confirmationFunction,
      },
    });
  }
}
