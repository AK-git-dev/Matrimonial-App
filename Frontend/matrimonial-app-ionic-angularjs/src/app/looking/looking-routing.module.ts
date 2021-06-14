import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LookingPage } from './looking.page';

const routes: Routes = [
  {
    path: '',
    component: LookingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LookingPageRoutingModule {}
