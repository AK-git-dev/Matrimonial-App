import { Component, OnInit } from '@angular/core';
import { MenuController,ModalController } from '@ionic/angular';
import { PrivacySettingsPage } from '../additional-pages/privacy-settings/privacy-settings.page';
import { HideProfilePage } from "../additional-pages/hide-profile/hide-profile.page";
import { NotificationsSettingsPage } from "../additional-pages/notifications-settings/notifications-settings.page";
import { ChangePasswordPage } from "../additional-pages/change-password/change-password.page";

import { AlertController } from '@ionic/angular';
// window.alertController = alertController;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {


  isDown: boolean = true;
  score: number = 20;
  id: string = 'H12345';
  constructor(private modalController: ModalController,private menu: MenuController, private alertController: AlertController ) { }

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

  async presentModal2() {
    console.log('Inside modal')
    const modal = await this.modalController.create({
      component: NotificationsSettingsPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async presentModal3() {
    console.log('Inside modal')
    const modal = await this.modalController.create({
      component: ChangePasswordPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
  async presentModal4() {
    console.log('Inside modal')
    const modal = await this.modalController.create({
      component: HideProfilePage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }




  async onClick(){
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      message: 'Do you really want to delete these Account? This process cannot be undo',
      buttons: ['Disagree', 'Agree']
    });

    await alert.present();
  }
}
