import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DpMatchPageRoutingModule } from './dp-match-routing.module';

import { DpMatchPage } from './dp-match.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DpMatchPageRoutingModule
  ],
  declarations: [DpMatchPage]
})
export class DpMatchPageModule {}
