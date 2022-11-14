import { NgModule } from '@angular/core';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { BoardRoutingModule } from './board-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TaskComponent } from './components/task/task.component';
@NgModule({
  declarations: [BoardPageComponent, TaskComponent],
  imports: [BoardRoutingModule, SharedModule],
})
export class BoardModule {}
