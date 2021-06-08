import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationPageRoutingModule } from './registration-routing.module';

import { RegistrationPage } from './registration.page';
import { IonIntlTelInputModule } from 'ion-intl-tel-input';
import { NgxOtpInputModule } from 'ngx-otp-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationPageRoutingModule,
    IonIntlTelInputModule, 
    NgxOtpInputModule
  ],
  declarations: [RegistrationPage]
})
export class RegistrationPageModule {}
