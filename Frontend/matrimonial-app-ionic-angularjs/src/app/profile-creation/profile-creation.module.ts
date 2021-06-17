import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileCreationPageRoutingModule } from './profile-creation-routing.module';

import { ProfileCreationPage } from './profile-creation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileCreationPageRoutingModule
  ],
  declarations: [ProfileCreationPage]
})

export class ProfileCreationPageModule{}