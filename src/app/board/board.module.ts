import { NgModule } from '@angular/core';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { BoardRoutingModule } from './board-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TaskComponent } from './components/task/task.component';
import { DialogTaskComponent } from './components/dialog-task/dialog-task.component';
import { DialogColumnComponent } from './components/dialog-column/dialog-column.component';
import { ColumnComponent } from './components/column/column.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    BoardPageComponent,
    TaskComponent,
    DialogTaskComponent,
    DialogColumnComponent,
    ColumnComponent,
  ],
  imports: [BoardRoutingModule, SharedModule, MatTooltipModule],
  exports: [TaskComponent],
})
export class BoardModule {}
