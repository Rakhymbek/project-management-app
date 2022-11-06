import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BoardsItemComponent } from './components/boards-item/boards-item.component';
import { BoardsListComponent } from './components/boards-list/boards-list.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { BoardRoutingModule } from './board-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';

@NgModule({
  declarations: [BoardsItemComponent, BoardsListComponent, BoardPageComponent, MainPageComponent],
  imports: [SharedModule, BoardRoutingModule],
})
export class BoardModule {}
