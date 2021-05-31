import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'trust-score',
    loadChildren: () => import('./trust-score/trust-score.module').then(m => m.TrustScorePageModule)

  },
  {
    path: 'user-home',
    loadChildren: () => import('./user-home/user-home.module').then(m => m.UserHomePageModule)
  },
  {
  path: 'notifications',
  loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsPageModule)
  },
{
  path: 'registration',
    loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationPageModule)
},
{
  path: 'pref-partner',
    loadChildren: () => import('./pref-partner/pref-partner.module').then(m => m.PrefPartnerPageModule)
},
{
  path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule)
},

{
  path: 'pref-part',
    loadChildren: () => import('./pref-part/pref-part.module').then(m => m.PrefPartPageModule)
},

{
  path: 'ed-car',
    loadChildren: () => import('./ed-car/ed-car.module').then(m => m.EdCarPageModule)
},
  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'edit-preference',
    loadChildren: () => import('./edit-preference/edit-preference.module').then( m => m.EditPreferencePageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  },

  {
    path: 'family-details',
    loadChildren: () => import ('./family-details/family-details.module').then(m => m.FamilyDetailsPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }