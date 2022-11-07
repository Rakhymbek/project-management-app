import { NgModule } from '@angular/core';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { SharedModule } from '../shared/shared.module';
import { BoardRoutingModule } from './board-routing.module';

@NgModule({
  declarations: [BoardPageComponent],
  imports: [SharedModule, BoardRoutingModule],
})
export class BoardModule {}
