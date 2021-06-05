import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from "@angular/forms";
// ///////////////////////////////////////////Angular Material
import {MatSelectModule} from '@angular/material/select';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { EmojiPickerModule } from 'ionic-emoji-picker';
import { NgxEmojiPickerModule } from 'ngx-emoji-picker';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { File } from '@ionic-native/file/ngx';
import { Media } from '@ionic-native/media/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import  { IonIntlTelInputModule } from 'ion-intl-tel-input';
import { NgxOtpInputModule } from 'ngx-otp-input';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, BrowserAnimationsModule,
    MatSelectModule,ReactiveFormsModule, NgxEmojiPickerModule.forRoot(), IonIntlTelInputModule, 
    NgxOtpInputModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
                MediaCapture, 
                File, 
                Media, 
                FileTransfer,
                FileTransferObject,
                Camera
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
