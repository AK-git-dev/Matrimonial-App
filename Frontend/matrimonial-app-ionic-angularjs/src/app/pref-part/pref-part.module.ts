import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrefPartPageRoutingModule } from './pref-part-routing.module';

import { PrefPartPage } from './pref-part.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrefPartPageRoutingModule
  ],
  declarations: [PrefPartPage]
})
export class PrefPartPageModule {}
