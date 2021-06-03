import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-notifications-settings',
  templateUrl: './notifications-settings.page.html',
  styleUrls: ['./notifications-settings.page.scss'],
})
export class NotificationsSettingsPage implements OnInit {

  constructor(private modalController: ModalController , private menu: MenuController) { }

  ngOnInit() {
  }
  dismiss() {
    console.log('Dismiss modal')
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
