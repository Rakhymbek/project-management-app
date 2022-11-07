import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DragDropModule,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatSidenavModule,
  ],
  exports: [
    DragDropModule,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatSidenavModule,
  ],
})
export class MaterialModule {}
