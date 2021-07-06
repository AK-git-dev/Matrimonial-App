import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { SettingsPage } from 'src/app/settings/settings.page';
import { PersonalDetails } from "../../services/PersonalDetails.service";
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  username;
  isDown: boolean = true;
  score: number = 20;
  id: string = 'H12345';

  constructor(private menu: MenuController, private personalDetails: PersonalDetails, private modalController: ModalController) { }

  ngOnInit() {
    this.personalDetails.userDetail() //.pipe(map(userDetails => userDetails))
    .subscribe
    (
      data =>
      {
       const arrData = [data];
      //  console.log(arrData);
       this.username=arrData[0].userDetails.fullname;
      
      }
    );
   }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  // async presentModal() {
  //   console.log('Inside modal')
  //   const modal = await this.modalController.create({
  //     component: SettingsPage,
  //     cssClass: 'my-custom-class'
  //   });
  //   return await modal.present();
  // }

}
