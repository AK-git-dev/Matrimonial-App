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

}
