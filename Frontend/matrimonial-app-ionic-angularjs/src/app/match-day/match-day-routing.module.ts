import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatchDayPage } from './match-day.page';

const routes: Routes = [
  {
    path: '',
    component: MatchDayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchDayPageRoutingModule {}
