import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {

  receivedPage: boolean = true; 
  segmentModal1 = 'accepted';
  segmentModal2 = 'accepted';

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

  constructor() { }

  ngOnInit() {
  }

  received() {
    this.receivedPage = true;
  }

  sent() {
    this.receivedPage = false;
  }

  segmentChanged(event) {
    console.log(event)
  }

}
