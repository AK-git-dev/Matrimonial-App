import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FamilyDetailsPageRoutingModule } from './family-details-routing.module';

import { FamilyDetailsPage } from './family-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FamilyDetailsPageRoutingModule
  ],
  declarations: [FamilyDetailsPage]
})
export class FamilyDetailsPageModule {}
