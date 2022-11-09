import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

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
  ],
})
export class MaterialModule {}
