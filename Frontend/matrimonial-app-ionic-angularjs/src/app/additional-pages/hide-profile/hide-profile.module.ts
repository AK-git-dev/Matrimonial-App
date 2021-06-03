import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HideProfilePageRoutingModule } from './hide-profile-routing.module';

import { HideProfilePage } from './hide-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HideProfilePageRoutingModule
  ],
  declarations: [HideProfilePage]
})
export class HideProfilePageModule {}
