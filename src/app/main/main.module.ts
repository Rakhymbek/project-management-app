import { NgModule } from '@angular/core';
import { BoardsItemComponent } from './components/boards-item/boards-item.component';
import { MainRoutingModule } from './main-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DialogCreateComponent } from './components/dialog-create/dialog-create.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { BoardModule } from '../board/board.module';

@NgModule({
  declarations: [
    BoardsItemComponent,
    MainPageComponent,
    DialogCreateComponent,
    SearchPageComponent,
  ],
  imports: [CommonModule, MainRoutingModule, SharedModule, MatTooltipModule, BoardModule],
})
export class MainModule {}
