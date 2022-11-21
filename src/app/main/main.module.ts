import { NgModule } from '@angular/core';
import { BoardsItemComponent } from './components/boards-item/boards-item.component';
import { MainRoutingModule } from './main-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DialogCreateComponent } from './components/dialog-create/dialog-create.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [BoardsItemComponent, MainPageComponent, DialogCreateComponent],
  imports: [CommonModule, MainRoutingModule, SharedModule, MatTooltipModule],
})
export class MainModule {}
