import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DpMatchPage } from './dp-match.page';

const routes: Routes = [
  {
    path: '',
    component: DpMatchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DpMatchPageRoutingModule {}
