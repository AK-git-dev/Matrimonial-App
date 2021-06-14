import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MutualMatchPage } from './mutual-match.page';

const routes: Routes = [
  {
    path: '',
    component: MutualMatchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MutualMatchPageRoutingModule {}
