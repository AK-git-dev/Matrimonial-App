import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrivateChatPageRoutingModule } from './private-chat-routing.module';

import { PrivateChatPage } from './private-chat.page';
import { NgxEmojiPickerModule } from 'ngx-emoji-picker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrivateChatPageRoutingModule,
    NgxEmojiPickerModule.forRoot()
  ],
  declarations: [PrivateChatPage]
})
export class PrivateChatPageModule {}
