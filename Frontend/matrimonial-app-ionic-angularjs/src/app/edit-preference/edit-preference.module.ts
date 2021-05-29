import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPreferencePageRoutingModule } from './edit-preference-routing.module';

import { EditPreferencePage } from './edit-preference.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPreferencePageRoutingModule
  ],
  declarations: [EditPreferencePage]
})
export class EditPreferencePageModule {}
