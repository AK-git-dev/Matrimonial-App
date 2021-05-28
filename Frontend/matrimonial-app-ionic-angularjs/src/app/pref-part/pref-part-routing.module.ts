import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrefPartPage } from './pref-part.page';

const routes: Routes = [
  {
    path: '',
    component: PrefPartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrefPartPageRoutingModule {}
