import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmailLoginPage } from './email-login.page';

const routes: Routes = [
  {
    path: '',
    component: EmailLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailLoginPageRoutingModule {}
