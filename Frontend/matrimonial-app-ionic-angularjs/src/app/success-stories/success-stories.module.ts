import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuccessStoriesPageRoutingModule } from './success-stories-routing.module';

import { SuccessStoriesPage } from './success-stories.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuccessStoriesPageRoutingModule
  ],
  declarations: [SuccessStoriesPage]
})
export class SuccessStoriesPageModule {}
