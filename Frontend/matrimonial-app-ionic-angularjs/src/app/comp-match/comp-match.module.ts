import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompMatchPageRoutingModule } from './comp-match-routing.module';

import { CompMatchPage } from './comp-match.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompMatchPageRoutingModule
  ],
  declarations: [CompMatchPage]
})
export class CompMatchPageModule {}
