import { Component, OnInit } from '@angular/core';
import { MenuController,ModalController } from '@ionic/angular';
@Component({
  selector: 'app-hide-profile',
  templateUrl: './hide-profile.page.html',
  styleUrls: ['./hide-profile.page.scss'],
})
export class HideProfilePage implements OnInit {

  constructor(private modalController: ModalController,private menu: MenuController) { }

  ngOnInit() {
  }
  dismiss() {
    console.log('Dismiss modal')
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
