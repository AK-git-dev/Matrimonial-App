import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LifestylePage } from './lifestyle.page';

const routes: Routes = [
  {
    path: '',
    component: LifestylePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LifestylePageRoutingModule {}
