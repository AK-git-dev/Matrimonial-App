import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'trust-score',
    loadChildren: () => import('./trust-score/trust-score.module').then( m => m.TrustScorePageModule)

  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },

{
    path: 'pref-part',
    loadChildren: () => import('./pref-part/pref-part.module').then( m => m.PrefPartPageModule)
  },

  {
    path: 'ed-car',
    loadChildren: () => import('./ed-car/ed-car.module').then( m => m.EdCarPageModule)
  },
  // {
  //   path: 'tab1',
  //   loadChildren: () => import('./tabs/tab1/tab1.module').then( m => m.Tab1PageModule)
  // },
  // {
  //   path: 'tab2',
  //   loadChildren: () => import('./tabs/tab2/tab2.module').then( m => m.Tab2PageModule)
  // },
  // {
  //   path: 'tabs2',
  //   loadChildren: () => import('./tabs2/tabs2.module').then( m => m.Tabs2PageModule)
  // },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }