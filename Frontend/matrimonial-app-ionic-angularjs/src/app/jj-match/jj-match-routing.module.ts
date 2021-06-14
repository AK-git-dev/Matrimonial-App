import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JjMatchPage } from './jj-match.page';

const routes: Routes = [
  {
    path: '',
    component: JjMatchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JjMatchPageRoutingModule {}
