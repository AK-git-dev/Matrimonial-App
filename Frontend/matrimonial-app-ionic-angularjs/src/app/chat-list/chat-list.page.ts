import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.page.html',
  styleUrls: ['./chat-list.page.scss'],
})
export class ChatListPage implements OnInit {
  static chatUserId;
  static chatUserName;
  static chatActive = 0;
  segmentModal = 'conversations';

  // user: object = {
  //   username: 'Aashray Jain',
  //   photo: '',
  //   message: 'Hello'
  // }

  // eslint-disable-next-line @typescript-eslint/ban-types
  users: object[] = [
    {
      userId: 1,
      username: 'aashray',
      password: '1234',
      photo: '../../assets/chat-list/profile/i1.png',
      message: 'Hello',
      phone: '7389330515'
    },
    {
      userId: 2,
      username: 'sourabh',
      password: '1234',
      photo: '../../assets/chat-list/profile/i1.png',
      message: 'Hi',
      phone: '7389330516'
    },
    {
      userId: 3,
      username: 'Rinkesh Kore',
      password: '1234',
      photo: '../../assets/chat-list/profile/i2.png',
      message: 'How are you',
      phone: '8830109485'
    },
    {
      userId: 4,
      username: 'Shubham Pawaskar',
      password: '1234',
      photo: '../../assets/chat-list/profile/i2.png',
      message: 'Ok',
      phone: '7507750021'
    }
  ];

  opponentId;


  constructor(private router: Router, private chatService: ChatService) { }

  ngOnInit() {
    //this.segmentModal = this.router.getCurrentNavigation().extras.state.data;
    //this.chatService.connectToChat();
    ChatListPage.chatActive = 0;

  }

  ionViewDidEnter() {
    ChatListPage.chatActive = 0;
  }

  segmentChanged(event) {
    console.log(event);
  }

  connectToPrivate(user) {
    this.chatService.getUserByLogin(user.username, (result) => {
      ChatListPage.chatUserId = result.items[0].user.id;
      ChatListPage.chatUserName = result.items[0].user.full_name;
      this.router.navigate(['private-chat']);
    });
    // this.chatService.createDialog(this.opponentId);
  }


}
