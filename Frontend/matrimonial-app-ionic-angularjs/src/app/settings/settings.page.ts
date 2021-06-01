import { Component, OnInit } from '@angular/core';
import { MenuController,ModalController } from '@ionic/angular';
import { PrivacySettingsPage } from '../additional-pages/privacy-settings/privacy-settings.page';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {


  isDown: boolean = true;
  score: number = 20;
  id: string = 'H12345';
  constructor(private modalController: ModalController,private menu: MenuController) { }

  ngOnInit() {
  }

  dismiss() {
    console.log('Dismiss modal')
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  async presentModal() {
    console.log('Inside modal')
    const modal = await this.modalController.create({
      component: PrivacySettingsPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
