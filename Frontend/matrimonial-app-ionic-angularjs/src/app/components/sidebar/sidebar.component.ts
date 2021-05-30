import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { SettingsPage } from 'src/app/settings/settings.page';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  isDown: boolean = true;

  constructor(private menu: MenuController, private modalController: ModalController) { }

  ngOnInit() { }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  async presentModal() {
    console.log('Inside modal')
    const modal = await this.modalController.create({
      component: SettingsPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
