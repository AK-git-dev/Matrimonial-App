import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-user-popover',
  templateUrl: './user-popover.component.html',
  styleUrls: ['./user-popover.component.scss'],
})
export class UserPopoverComponent implements OnInit {

  constructor(private alertController: AlertController, private router: Router, private popover: PopoverController) { }

  ngOnInit() {}

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
          this.popover.dismiss();
          this.router.navigate(['/home']);
        }
      }, 
      {
        text: 'No',
        handler:() => {
          this.popover.dismiss();
          console.log('dismiss');
        } 
      }
    ]
    });
    await alert.present();
  }
  viewProfile() {
    this.popover.dismiss();
    this.router.navigate(['/edit-profile']);
  }

}
