import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [MaterialModule, ReactiveFormsModule, FormsModule],
  exports: [MaterialModule, ReactiveFormsModule, FormsModule],
})
export class SharedModule {}
