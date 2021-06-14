import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifiedMatchPageRoutingModule } from './verified-match-routing.module';

import { VerifiedMatchPage } from './verified-match.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifiedMatchPageRoutingModule
  ],
  declarations: [VerifiedMatchPage]
})
export class VerifiedMatchPageModule {}
