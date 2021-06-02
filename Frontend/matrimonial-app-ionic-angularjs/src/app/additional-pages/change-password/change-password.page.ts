import { Component, OnInit } from '@angular/core';
import { MenuController,ModalController } from '@ionic/angular';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

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
