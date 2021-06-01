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
