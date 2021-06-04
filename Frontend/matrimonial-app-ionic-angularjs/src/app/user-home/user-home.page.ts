import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.page.html',
  styleUrls: ['./user-home.page.scss'],
})
export class UserHomePage implements OnInit {

  username: string = 'Aashray Jain'

  @ViewChild(IonInfiniteScroll)
  infiniteScroll: IonInfiniteScroll;

  constructor() { }

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

}
