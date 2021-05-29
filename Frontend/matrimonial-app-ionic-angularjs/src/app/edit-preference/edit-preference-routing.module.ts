import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPreferencePage } from './edit-preference.page';

const routes: Routes = [
  {
    path: '',
    component: EditPreferencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPreferencePageRoutingModule {}
