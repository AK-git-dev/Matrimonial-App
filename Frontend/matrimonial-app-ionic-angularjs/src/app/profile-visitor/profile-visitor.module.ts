import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileVisitorPageRoutingModule } from './profile-visitor-routing.module';

import { ProfileVisitorPage } from './profile-visitor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileVisitorPageRoutingModule
  ],
  declarations: [ProfileVisitorPage]
})
export class ProfileVisitorPageModule {}
