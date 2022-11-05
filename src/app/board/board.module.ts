import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BoardItemComponent } from './components/board-item/board-item.component';
import { BoardListComponent } from './components/board-list/board-list.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';

@NgModule({
  declarations: [BoardItemComponent, BoardListComponent, BoardPageComponent],
  imports: [SharedModule],
})
export class BoardModule {}
