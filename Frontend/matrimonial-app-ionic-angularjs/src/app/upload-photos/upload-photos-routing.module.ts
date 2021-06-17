import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadPhotosPage } from './upload-photos.page';

const routes: Routes = [
  {
    path: '',
    component: UploadPhotosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadPhotosPageRoutingModule {}
