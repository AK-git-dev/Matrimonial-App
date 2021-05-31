import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EducationCareerPageRoutingModule } from './education-career-routing.module';

import { EducationCareerPage } from './education-career.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EducationCareerPageRoutingModule
  ],
  declarations: [EducationCareerPage]
})
export class EducationCareerPageModule {}
