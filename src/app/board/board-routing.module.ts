import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { NotFoundPageComponent } from '../core/pages/not-found-page/not-found-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: 'board/:id',
    component: BoardPageComponent,
  },
  {
    path: '404',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardRoutingModule {}
