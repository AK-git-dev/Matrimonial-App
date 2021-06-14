import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CachePageRoutingModule } from './cache-routing.module';

import { CachePage } from './cache.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CachePageRoutingModule
  ],
  declarations: [CachePage]
})
export class CachePageModule {}
