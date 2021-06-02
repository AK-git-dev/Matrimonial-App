import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationsSettingsPage } from './notifications-settings.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationsSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationsSettingsPageRoutingModule {}
