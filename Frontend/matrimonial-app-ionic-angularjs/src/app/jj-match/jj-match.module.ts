import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JjMatchPageRoutingModule } from './jj-match-routing.module';

import { JjMatchPage } from './jj-match.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JjMatchPageRoutingModule
  ],
  declarations: [JjMatchPage]
})
export class JjMatchPageModule {}
