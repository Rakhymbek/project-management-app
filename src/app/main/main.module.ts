import { NgModule } from '@angular/core';
import { BoardsItemComponent } from './components/boards-item/boards-item.component';
import { BoardsListComponent } from './components/boards-list/boards-list.component';
import { MainRoutingModule } from './main-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [BoardsItemComponent, BoardsListComponent, MainPageComponent],
  imports: [CommonModule, MainRoutingModule],
})
export class MainModule {}
