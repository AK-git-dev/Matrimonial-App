import { Component, OnInit } from '@angular/core';
import { MenuController,ModalController } from '@ionic/angular';
@Component({
  selector: 'app-privacy-settings',
  templateUrl: './privacy-settings.page.html',
  styleUrls: ['./privacy-settings.page.scss'],
})
export class PrivacySettingsPage implements OnInit {
  isDown: boolean = true;
  score: number = 20;

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
