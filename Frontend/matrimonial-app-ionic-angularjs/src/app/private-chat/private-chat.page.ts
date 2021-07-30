/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { IonContent } from '@ionic/angular';
import { PopoverComponent } from '../components/popover/popover.component';
// import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';
import { MediaObject } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';
import { Media } from '@ionic-native/media/ngx';
import { Router } from '@angular/router';
import { ChatListPage } from './../chat-list/chat-list.page';
import { ChatService } from '../services/chat.service';
import { LoginPage } from '../login/login.page';
import { interval, Observable, of, Subscription } from 'rxjs';


@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.page.html',
  styleUrls: ['./private-chat.page.scss'],
})
export class PrivateChatPage implements OnInit {
  @ViewChild('scrollElement') content: IonContent;
  ConnectyCube = window["ConnectyCube"];
  loginuser;
  username;
  id;
  time = '11:45 AM';
  toggled: boolean = false;
  message: string;
  status: string;
  audioFile: MediaObject;

  sent;
  delivered;
  msgid;
  typing;
  typeid;
  typestate;
  msgstate;
  msgs;
  deliverstate;
  readstate;

  user;
  //path;
  messages=[];
  obarray: Observable<any[]>;
  mm;
  // updateSubscription: Subscription;
  us: Subscription;
  calleesIds;
  additionalOptions;
  mediaParams;
  sessionType;
  session;




  constructor(private popoverController: PopoverController,private chatService: ChatService,public alertController: AlertController,
    private file: File, private media: Media, private router: Router) {

    }

    ionViewDidLoad() {
      this.content.scrollToBottom(1);
    }

  ngOnInit() {
    ChatListPage.chatActive = 1;
    let typeid;
    let typestate;
    let msgstate;
    let msg;
    let call;
    let callSession;
    let dmsgid = null;
    let rmsgid = false;
    this.username = ChatListPage.chatUserName;
    this.id = ChatListPage.chatUserId;
    this.loginuser = LoginPage.userId;
    this.chatService.createDialog(this.id);
    this.getAllDialog();
    this.calleesIds = [this.id]; // opponent User's ids
    this.additionalOptions = {bandwidth: 256};
    this.sessionType = this.ConnectyCube.videochat.CallType.VIDEO;
    this.session = this.ConnectyCube.videochat.createNewSession(this.calleesIds, this.sessionType, this.additionalOptions);

    this.ConnectyCube.chat.onMessageListener = function onMessage(userId, message) {
      console.log("[ConnectyCube.chat.onMessageListener] callback:", userId, message);
      msgstate = true;
      msg = message.body;
    };
   this.ConnectyCube.chat.onReadStatusListener = function(messageId, dialogId, userId) {
      console.log("[ConnectyCube.chat.onReadStatusListener] callback:", messageId, dialogId, userId);
      rmsgid = true;
   };
    this.ConnectyCube.chat.onDeliveredStatusListener  = function(messageId, dialogId, userId) {
        console.log("[ConnectyCube.chat.onDeliveredStatusListener ] callback:", messageId, dialogId, userId);
        dmsgid = messageId;
     };
  this.ConnectyCube.chat.onMessageTypingListener = function(isTyping, userId, dialogId) {
    console.log("[ConnectyCube.chat.onMessageTypingListener] callback:", isTyping, userId, dialogId);
    typeid = userId;
    typestate = isTyping;
  };

  this.mediaParams = {
    video: { width: 1280, height: 720 },
    audio: true,
    options: {
      muted: true,
      mirror: true,
    },
    //elemId: "localVideoElem",
  };

  this.ConnectyCube.videochat.onCallListener = async function(session, extension) {
   console.log('call listener');
   call =  true;
   callSession = session;
  };

  this.ConnectyCube.videochat.onUserNotAnswerListener = function(session, userId) {
    console.log('session',session,userId);
  };

  this.ConnectyCube.videochat.onAcceptCallListener = function(session, userId, extension) {
    console.log('accept',session);
  };

  this.ConnectyCube.videochat.onRemoteStreamListener = function(session, userID, remoteStream) {
    session.attachMediaStream("remoteOpponentVideoElementId", remoteStream);
  };

    this.us = interval(1).subscribe(
      async (val) => {
         this.typeid = typeid;
         this.typestate = typestate;
         this.msgstate = msgstate;
         this.msgs = msg;
         //typing
         if(this.typestate){
           this.typing=this.typestate;
         }
         else{
           this.typing=false;
         }
         //get new msg
         if(this.msgstate){
           this.msgstate = false;
           msgstate = false;
           this.messages.push({message:this.msgs,sender_id:this.id,recipient_id:this.loginuser});
           this.obarray = of(this.messages);
           if(ChatListPage.chatActive === 1){
            const params = {
              messageId: this.msgid,
              userId: this.id,
              dialogId:  sessionStorage.getItem('dialog._id'),
            };

            this.ConnectyCube.chat.sendReadStatus(params);
          }
         }
         //update status to delivered
         if(dmsgid != null){
           dmsgid = null;
           this.messages[this.messages.length-1].status = 'delivered';
           this.obarray = of(this.messages);
         }

         //read
         if(rmsgid){
           rmsgid = false;
           this.messages[this.messages.length-1].status = 'read';
           this.obarray = of(this.messages);
         }

         if(call){
           call = false;
          const alert = await this.alertController.create({
            header: 'Confirm!',
            message: 'Message <strong>text</strong>!!!',
            buttons: [
              {
                text: 'Cancel',
                handler: () => {
                  console.log('Cancel');
                }
              },
              {
                text: 'Accept',
                handler: () => {
                  callSession.getUserMedia(this.mediaParams).then((localStream) => {
                        const extensions = {};
                        callSession.accept(extensions, (error) => {
                          console.log(error);
                        });
                      }).catch((error) => { console.log(error); });

                }
              }
            ]
          });

          alert.present();
         }

    });


    //       this.mm = false;
            // this.updateSubscription = interval(1).subscribe(
            //   (val1) => {
            //     console.log('timeout');
            //     this.getAllDialog();
            // });
            //   clearInterval();
            //   this.updateSubscription.unsubscribe();
    //      }

    //   });
    // this.audioFile = this.media.create(this.file.externalRootDirectory + '/audiofile.mp3');
    // this.user = this.router.getCurrentNavigation().extras.state.user;
    // this.username = this.user.username;
    //this.path = this.router.getCurrentNavigation().extras.state.path;
  }

  ionip(event){
    if(event.target.value !== ''){
      this.ConnectyCube.chat.sendIsTypingStatus(this.id);
    }
    else{
      this.ConnectyCube.chat.sendIsStopTypingStatus(this.id);
    }

  }

//
  async getAllDialog() {
    const params1 = {
      messageId: this.msgid,
      userId: this.id,
      dialogId:  sessionStorage.getItem('dialog._id'),
    };

    this.ConnectyCube.chat.sendReadStatus(params1);
    let mid;
    this.messages = [];
    this.obarray = new Observable<any[]>();
    const params = {
      chat_dialog_id: sessionStorage.getItem('dialog._id'),
      sort_desc: "date_sent",
      limit: 1000,
      skip: 0,
    };

    await this.ConnectyCube.chat.message
      .list(params)
      .then((msg) => {
        for(let i=msg.items.length-1;i>=0;i--){
          msg.items[i].status = 'sent';
          if(msg.items[i].delivered_ids.length === 2){
            msg.items[i].status = 'delivered';
          }
          if(msg.items[i].read_ids.length === 2){
            msg.items[i].status = 'read';
          }
          this.messages.push(msg.items[i]);
        }
        this.obarray = of(this.messages);
        // this.obarray.subscribe(i => {
        //   for(let j=0;j<i.length;j++){
        //     console.log(i[j]);
        //   }
        // });
        console.log('list',this.messages);
      })
      .catch((error) => {});

  }

  async send(){
    this.msgid = this.chatService.sendReceiveChat(this.id,this.message);
    this.messages.push({message:this.message,sender_id:this.loginuser,recipient_id:this.id});
    this.obarray = of(this.messages);
    this.message = '';
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }


  handleSelection(event) {
    console.log('Inside picker');
    this.message += event.char;
  }

  startRecording() {
    this.audioFile.startRecord();
    this.status = "recording...";
    console.log('Recording..');
  }

  stopRecording() {
    this.audioFile.stopRecord();
    this.status = "stopped";
    console.log('Stopping..');
  }

  videoCall(){
    //console.log(session);
    this.session
      .getUserMedia(this.mediaParams)
      .then((localStream) => {
        //this.session.attachMediaStream("localVideoElem", localStream);
        const extension = {};
        this.session.call(extension, (error) => {
          console.log(error);
        });
      })
      .catch((error) => {});




  }


}
