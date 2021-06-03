import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HideProfilePage } from './hide-profile.page';

const routes: Routes = [
  {
    path: '',
    component: HideProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HideProfilePageRoutingModule {}
