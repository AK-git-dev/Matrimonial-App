import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrustScorePageRoutingModule } from './trust-score-routing.module';

import { TrustScorePage } from './trust-score.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrustScorePageRoutingModule
  ],
  declarations: [TrustScorePage]
})
export class TrustScorePageModule {}
