import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController,ModalController,PopoverController } from '@ionic/angular';
import { PrivacySettingsPage } from '../additional-pages/privacy-settings/privacy-settings.page';
import { HideProfilePage } from "../additional-pages/hide-profile/hide-profile.page";
import { NotificationsSettingsPage } from "../additional-pages/notifications-settings/notifications-settings.page";

import { PersonalDetails } from "../services/PersonalDetails.service";
import { AlertController } from '@ionic/angular';
// window.alertController = alertController;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  globalResponse: any;
  isDown: boolean = true;
  score: number = 20;
  id: string = 'H12345';
  constructor(private modalController: ModalController, private router: Router, private personalDetails: PersonalDetails  , private menu: MenuController, private alertController: AlertController,private popoverController: PopoverController ) { }

  ngOnInit() {
  }

  async onClick(){
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      cssClass: 'my-custom-class',
      message: 'Do you really want to delete these Account? This process cannot be undo',
      buttons: ['Disagree', 'Agree']
    });

    await alert.present();
  }

  async rate() {
    const alert = await this.alertController.create ({
      
       header: 'Rate Us...',
       cssClass: 'my-custom-class',
        message: 'Hi, Take a minute to rate this app and help support to improve more new features.',
        buttons: ['Pass','Rate it!','Ask Later']
    });
    await alert.present();
  }

  logout() {
    this.presentAlert();
   
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Logout',
      subHeader: 'Do you want to logout?',
      buttons: [
        {
        text: 'Yes',
        handler: () => {
          
          this.popoverController.dismiss();
          this.personalDetails.logout().subscribe((msg)=>{
            this.alertMsg();
              this.globalResponse = msg;
          },
          error => {
           console.log(error.message);
        },
         () => {
           console.log(this.globalResponse);
           this.router.navigate(['/entry-slides']);
         }
          )
        }
      }, 
      {
        text: 'No',
        handler:() => {
          this.popoverController.dismiss();
          console.log('dismiss');
        } 
      }
    ]
    });
    
    await alert.present();
    
  }
  async alertMsg(){
    const alert = await this.alertController.create({
      header: 'Logout successfully',
      cssClass: 'my-custom-class',
      message: 'Thank you',
    });
    await alert.present();
  }

}
