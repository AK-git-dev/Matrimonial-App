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

  segmentModal = 'conversations';

  // user: object = {
  //   username: 'Aashray Jain',
  //   photo: '',
  //   message: 'Hello'
  // }

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
      username: 'abhay',
      password: '1234',
      photo: '../../assets/chat-list/profile/i2.png',
      message: 'How are you',
      phone: '7389330517'
    },
    {
      userId: 4,
      username: 'vijay',
      password: '1234',
      photo: '../../assets/chat-list/profile/i2.png',
      message: 'Ok',
      phone: '9630485638'
    }
  ];

  opponentId;
  

  constructor(private router: Router, private chatService: ChatService) { }

  ngOnInit() {
    this.segmentModal = this.router.getCurrentNavigation().extras.state.data;
    this.chatService.connectToChat();
    
  }

  segmentChanged(event) {
    console.log(event);
  }

  connectToPrivate(user) {
    console.log(user.phone);
    this.chatService.getUserByLogin(user.username, (result) => {
      console.log(result);
      this.opponentId = result.user.id;
      console.log(this.opponentId);
    });
    this.chatService.createDialog(this.opponentId);
  }


}
