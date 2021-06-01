import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EducationCareerPage } from './education-career.page';

const routes: Routes = [
  {
    path: '',
    component: EducationCareerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EducationCareerPageRoutingModule {}
