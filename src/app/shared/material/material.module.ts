import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DragDropModule,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
  ],
  exports: [
    DragDropModule,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
  ],
})
export class MaterialModule {}
