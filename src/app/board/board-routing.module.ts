import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from '../core/pages/not-found-page/not-found-page.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';

const routes: Routes = [
  {
    path: '',
    component: BoardPageComponent,
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardRoutingModule {}
