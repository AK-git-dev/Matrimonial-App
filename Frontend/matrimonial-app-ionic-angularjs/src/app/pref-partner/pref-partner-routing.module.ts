import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrefPartnerPage } from './pref-partner.page';

const routes: Routes = [
  {
    path: '',
    component: PrefPartnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrefPartnerPageRoutingModule {}
