import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailLoginPageRoutingModule } from './email-login-routing.module';

import { EmailLoginPage } from './email-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmailLoginPageRoutingModule
  ],
  declarations: [EmailLoginPage]
})
export class EmailLoginPageModule {}
