import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrefPartnerPageRoutingModule } from './pref-partner-routing.module';

import { PrefPartnerPage } from './pref-partner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrefPartnerPageRoutingModule
  ],
  declarations: [PrefPartnerPage]
})
export class PrefPartnerPageModule {}
