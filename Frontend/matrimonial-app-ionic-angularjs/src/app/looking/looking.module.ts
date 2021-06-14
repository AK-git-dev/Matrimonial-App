import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LookingPageRoutingModule } from './looking-routing.module';

import { LookingPage } from './looking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LookingPageRoutingModule
  ],
  declarations: [LookingPage]
})
export class LookingPageModule {}
