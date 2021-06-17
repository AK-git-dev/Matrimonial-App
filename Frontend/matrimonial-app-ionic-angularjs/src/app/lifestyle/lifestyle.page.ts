import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lifestyle',
  templateUrl: './lifestyle.page.html',
  styleUrls: ['./lifestyle.page.scss'],
})
export class LifestylePage implements OnInit {

  isHidden = true;
  constructor() { }

  ngOnInit() {
  }

  onClick1(){
    this.isHidden = true;
  }
  onClick(){
    this.isHidden = false;
  }
}
