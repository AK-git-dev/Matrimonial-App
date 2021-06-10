import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrCodePage } from './qr-code.page';

const routes: Routes = [
  {
    path: '',
    component: QrCodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrCodePageRoutingModule {}
