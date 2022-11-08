import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  exports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule, HttpClientModule],
})
export class SharedModule {}
