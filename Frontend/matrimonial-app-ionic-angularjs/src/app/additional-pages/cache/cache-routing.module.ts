import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CachePage } from './cache.page';

const routes: Routes = [
  {
    path: '',
    component: CachePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CachePageRoutingModule {}
