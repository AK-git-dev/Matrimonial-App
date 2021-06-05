import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, PopoverController } from '@ionic/angular';
import { UserPopoverComponent } from '../components/user-popover/user-popover.component';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.page.html',
  styleUrls: ['./user-home.page.scss'],
})
export class UserHomePage implements OnInit {

  username: string = 'Aashray Jain'

  @ViewChild(IonInfiniteScroll)
  infiniteScroll: IonInfiniteScroll;

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      //logic
      let data = [1, 2, 3]
      if (data.length == 2) {
        event.target.disabled = true;
      }
    }, 10000);
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: UserPopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      backdropDismiss: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
    console.log(role)
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
