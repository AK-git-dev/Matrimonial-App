import { Component, NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { NotificationsPage } from '../../notifications/notifications.page'

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})

export class TabsComponent implements OnInit {

  constructor(private menu: MenuController, private modalController: ModalController) { }

  ngOnInit() {}

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  async presentModal() {
    console.log('Inside modal')
    const modal = await this.modalController.create({
      component: NotificationsPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
}
