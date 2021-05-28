import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  constructor(private menu: MenuController) { }

  ngOnInit() { }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

}
