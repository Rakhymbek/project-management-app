import { NgModule } from '@angular/core';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { BoardRoutingModule } from './board-routing.module';

@NgModule({
  declarations: [BoardPageComponent],
  imports: [BoardRoutingModule],
})
export class BoardModule {}
