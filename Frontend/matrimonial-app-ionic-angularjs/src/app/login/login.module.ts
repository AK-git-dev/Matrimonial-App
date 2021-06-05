import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { IonIntlTelInputModule } from 'ion-intl-tel-input';
import { NgxOtpInputModule } from 'ngx-otp-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    IonIntlTelInputModule, 
    NgxOtpInputModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
