import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.page.html',
  styleUrls: ['./chat-list.page.scss'],
})
export class ChatListPage implements OnInit {

  segmentModal = 'conversations';

  constructor(private router: Router) { }

  ngOnInit() {
    this.segmentModal = this.router.getCurrentNavigation().extras.state.data;
  }

  segmentChanged(event) {
    console.log(event);
  }

}
