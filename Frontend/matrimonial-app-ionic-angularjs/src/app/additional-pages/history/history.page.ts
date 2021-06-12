import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor() { }

  data: any;
  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

     
      // if (data.length == 1000) {
      //   event.target.disabled = true;
      // }
    }, 5000);
  }



  ngOnInit() {
  }

}
