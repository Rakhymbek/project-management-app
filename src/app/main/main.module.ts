import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BoardsItemComponent } from './components/boards-item/boards-item.component';
import { BoardsListComponent } from './components/boards-list/boards-list.component';
import { MainRoutingModule } from './main-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';

@NgModule({
  declarations: [BoardsItemComponent, BoardsListComponent, MainPageComponent],
  imports: [SharedModule, MainRoutingModule],
})
export class MainModule {}
