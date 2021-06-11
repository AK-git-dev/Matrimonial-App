import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatchDayPageRoutingModule } from './match-day-routing.module';

import { MatchDayPage } from './match-day.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatchDayPageRoutingModule
  ],
  declarations: [MatchDayPage]
})
export class MatchDayPageModule {}
