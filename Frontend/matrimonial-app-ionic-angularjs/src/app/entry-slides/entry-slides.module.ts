import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntrySlidesPageRoutingModule } from './entry-slides-routing.module';

import { EntrySlidesPage } from './entry-slides.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntrySlidesPageRoutingModule
  ],
  declarations: [EntrySlidesPage]
})
export class EntrySlidesPageModule {}
