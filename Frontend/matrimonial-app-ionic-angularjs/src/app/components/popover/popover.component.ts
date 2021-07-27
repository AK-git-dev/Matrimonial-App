/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ChatListPage } from './../../chat-list/chat-list.page';
import { ChatService } from './../../services/chat.service';
import { LoginPage } from './../../login/login.page';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  ConnectyCube = window["ConnectyCube"];
  loginuser;
  id;
  calleesIds;
  additionalOptions;

  constructor(private chatService: ChatService,public alertController: AlertController) { }

  ngOnInit() {
    this.id = ChatListPage.chatUserId;
    this.loginuser = LoginPage.userId;
    this.calleesIds = [this.id]; // opponent User's ids
    this.additionalOptions = {bandwidth: 256};

    this.ConnectyCube.videochat.onCallListener = function(session, extension) {
     console.log('call listener');
      // const alert = this.alertController.create({
      //   cssClass: 'my-custom-class',
      //   header: 'Confirm!',
      //   message: 'Message <strong>text</strong>!!!',
      //   buttons: [
      //     {
      //       text: 'Cancel',
      //       role: 'cancel',
      //       cssClass: 'secondary',
      //       handler: (blah) => {
      //         console.log('Confirm Cancel: blah');
      //       }
      //     }, {
      //       text: 'Okay',
      //       handler: () => {
      //         console.log('Confirm Okay');
      //       }
      //     }
      //   ]
      // });

      //alert.present();
      // const extensions = {};
      // session.accept(extensions);
    };

    this.ConnectyCube.videochat.onUserNotAnswerListener = function(session, userId) {
      console.log('session',session,userId);
    };

    this.ConnectyCube.videochat.onAcceptCallListener = function(session, userId, extension) {};

    this.ConnectyCube.videochat.onRemoteStreamListener = function(session, userID, remoteStream) {
      session.attachMediaStream("remoteOpponentVideoElementId", remoteStream);
    };

  }

  videoCall(){
    const sessionType = this.ConnectyCube.videochat.CallType.VIDEO;
    const session = this.ConnectyCube.videochat.createNewSession(this.calleesIds, sessionType, this.additionalOptions);
    console.log(session);
    const mediaParams = {
      audio: true,
      video: true,
      options: {
        muted: true,
        mirror: true,
      },
    };

    session
      .getUserMedia(mediaParams)
      .then((localStream) => {
        //console.log(localStream);
        //session.attachMediaStream("myVideoElementId", localStream);
        console.log('hello');
        const extension = {};
        session.call(extension, (error) => {
          console.log(error);
        });
      })
      .catch((error) => {});




  }

  audioCall(){
    // const sessionType = this.ConnectyCube.videochat.CallType.AUDIO;
    // const session = this.ConnectyCube.videochat.createNewSession(this.calleesIds, sessionType, this.additionalOptions);
  }

}
