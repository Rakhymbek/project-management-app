import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationModalData } from '../../models/confirmation-modal-data';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmationModalData) {}

  ngOnInit(): void {}
}
