import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileVisitorPage } from './profile-visitor.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileVisitorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileVisitorPageRoutingModule {}
