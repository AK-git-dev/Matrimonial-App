import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MutualMatchPageRoutingModule } from './mutual-match-routing.module';

import { MutualMatchPage } from './mutual-match.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MutualMatchPageRoutingModule
  ],
  declarations: [MutualMatchPage]
})
export class MutualMatchPageModule {}
