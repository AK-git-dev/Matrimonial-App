import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserHomePageRoutingModule } from './user-home-routing.module';

import { UserHomePage } from './user-home.page';

import { TabsComponent } from '../components/tabs/tabs.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserHomePageRoutingModule
  ],
  declarations: [UserHomePage, TabsComponent, SidebarComponent]
})
export class UserHomePageModule {}
