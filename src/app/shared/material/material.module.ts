import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [],
  imports: [
    DragDropModule,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    DragDropModule,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
  ],
})
export class MaterialModule {}
