import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifiedMatchPage } from './verified-match.page';

const routes: Routes = [
  {
    path: '',
    component: VerifiedMatchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifiedMatchPageRoutingModule {}
