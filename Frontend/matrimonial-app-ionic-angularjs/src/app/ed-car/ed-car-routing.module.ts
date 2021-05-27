import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EdCarPage } from './ed-car.page';

const routes: Routes = [
  {
    path: '',
    component: EdCarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EdCarPageRoutingModule {}
