import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationsSettingsPageRoutingModule } from './notifications-settings-routing.module';

import { NotificationsSettingsPage } from './notifications-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationsSettingsPageRoutingModule
  ],
  declarations: [NotificationsSettingsPage]
})
export class NotificationsSettingsPageModule {}
