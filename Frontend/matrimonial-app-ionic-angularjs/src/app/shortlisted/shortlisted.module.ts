import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShortlistedPageRoutingModule } from './shortlisted-routing.module';

import { ShortlistedPage } from './shortlisted.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShortlistedPageRoutingModule
  ],
  declarations: [ShortlistedPage]
})
export class ShortlistedPageModule {}
