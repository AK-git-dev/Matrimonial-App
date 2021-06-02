import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
      username: 'Aashray Jain',
      photo: '../../assets/chat-list/profile/i1.png',
      message: 'Hello'
    },
    {
      username: 'Sourabh Singh',
      photo: '../../assets/chat-list/profile/i1.png',
      message: 'Hi'
    },
    {
      username: 'Abhay Singh',
      photo: '../../assets/chat-list/profile/i2.png',
      message: 'How are you'
    },
    {
      username: 'Vijay',
      photo: '../../assets/chat-list/profile/i2.png',
      message: 'Ok'
    }
  ];
  

  constructor(private router: Router) { }

  ngOnInit() {
    this.segmentModal = this.router.getCurrentNavigation().extras.state.data;
  }

  segmentChanged(event) {
    console.log(event);
  }

}
