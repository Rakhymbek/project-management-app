import { NgModule } from '@angular/core';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { BoardRoutingModule } from './board-routing.module';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [BoardPageComponent],
  imports: [BoardRoutingModule, SharedModule],
})
export class BoardModule {}
