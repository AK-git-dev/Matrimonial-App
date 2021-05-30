import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FamilyDetailsPage } from './family-details.page';

const routes: Routes = [
  {
    path: '',
    component: FamilyDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FamilyDetailsPageRoutingModule {}
