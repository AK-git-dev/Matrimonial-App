import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompMatchPage } from './comp-match.page';

const routes: Routes = [
  {
    path: '',
    component: CompMatchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompMatchPageRoutingModule {}
