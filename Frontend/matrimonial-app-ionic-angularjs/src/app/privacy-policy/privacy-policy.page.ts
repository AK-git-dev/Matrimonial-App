import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.page.html',
  styleUrls: ['./privacy-policy.page.scss'],
})
export class PrivacyPolicyPage implements OnInit {
  menu: any;
  isDown: boolean = true;
  constructor() { }

  ngOnInit() {
  }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

}
