import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileCreationPage } from './profile-creation.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileCreationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileCreationPageRoutingModule {}
