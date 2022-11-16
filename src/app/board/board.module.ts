import { NgModule } from '@angular/core';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { BoardRoutingModule } from './board-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TaskComponent } from './components/task/task.component';
import { DialogTaskComponent } from './components/dialog-task/dialog-task.component';
import { DialogColumnComponent } from './components/dialog-column/dialog-column.component';
@NgModule({
  declarations: [BoardPageComponent, TaskComponent, DialogTaskComponent, DialogColumnComponent],
  imports: [BoardRoutingModule, SharedModule],
})
export class BoardModule {}
