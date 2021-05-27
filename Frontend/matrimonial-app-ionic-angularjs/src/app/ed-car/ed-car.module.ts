import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EdCarPageRoutingModule } from './ed-car-routing.module';

import { EdCarPage } from './ed-car.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EdCarPageRoutingModule
  ],
  declarations: [EdCarPage]
})
export class EdCarPageModule {}
