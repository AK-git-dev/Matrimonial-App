import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from "../app/auth-guard.guard";
const routes: Routes = [
  {
    path: 'entry-slides',
    loadChildren: () => import('./entry-slides/entry-slides.module').then(m => m.EntrySlidesPageModule)
  },
  {
    path: '',
    redirectTo: 'entry-slides',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  }
  ,{
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
    path: 'family-details',
    loadChildren: () => import('./family-details/family-details.module').then(m => m.FamilyDetailsPageModule)
  },

  {
    path: 'edit-profile', 
    loadChildren: () => import('./edit-profile/edit-profile.module').then(m => m.EditProfilePageModule)
  },
  {
    path: 'edit-preference',
    loadChildren: () => import('./edit-preference/edit-preference.module').then(m => m.EditPreferencePageModule)
  },
  {
    path: 'request',
    loadChildren: () => import('./request/request.module').then(m => m.RequestPageModule)
  },
  {
    path: 'education-career',
    loadChildren: () => import('./education-career/education-career.module').then(m => m.EducationCareerPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then(m => m.SearchPageModule)
  },
  {
    path: 'chat-list',
    loadChildren: () => import('./chat-list/chat-list.module').then(m => m.ChatListPageModule)
  },
  {
    path: 'private-chat',
    loadChildren: () => import('./private-chat/private-chat.module').then(m => m.PrivateChatPageModule)
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
    path: 'family-details',
    loadChildren: () => import('./family-details/family-details.module').then(m => m.FamilyDetailsPageModule)
  },

  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then(m => m.EditProfilePageModule)
  },
  {
    path: 'edit-preference',
    loadChildren: () => import('./edit-preference/edit-preference.module').then(m => m.EditPreferencePageModule)
  },
  {
    path: 'request',
    loadChildren: () => import('./request/request.module').then(m => m.RequestPageModule)
  },
  {
    path: 'education-career',
    loadChildren: () => import('./education-career/education-career.module').then(m => m.EducationCareerPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then(m => m.SearchPageModule)
  },
  {
    path: 'privacy-settings',
    loadChildren: () => import('./additional-pages/privacy-settings/privacy-settings.module').then(m => m.PrivacySettingsPageModule)
  },

  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactPageModule)
  },
  {
    path: 'profile-visitor',
    loadChildren: () => import('./profile-visitor/profile-visitor.module').then(m => m.ProfileVisitorPageModule)
  },
  {
    path: 'notifications-settings',
    loadChildren: () => import('./additional-pages/notifications-settings/notifications-settings.module').then(m => m.NotificationsSettingsPageModule)
  },

  {
    path: 'lifestyle',
    loadChildren: () => import('./lifestyle/lifestyle.module').then(m => m.LifestylePageModule)
  },
  {
    path: 'hide-profile',
    loadChildren: () => import('./additional-pages/hide-profile/hide-profile.module').then(m => m.HideProfilePageModule)
  },
  {
    path: 'profile-creation',
    loadChildren: () => import('./profile-creation/profile-creation.module').then(m => m.ProfileCreationPageModule)
  },
  {
    path: 'success-stories',
    loadChildren: () => import('./success-stories/success-stories.module').then(m => m.SuccessStoriesPageModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyPageModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfilePageModule)
  },
  {
    path: 'uploaded-documents',
    loadChildren: () => import('./uploaded-documents/uploaded-documents.module').then(m => m.UploadedDocumentsPageModule)
  },
  {
    path: 'entry-slides',
    loadChildren: () => import('./entry-slides/entry-slides.module').then(m => m.EntrySlidesPageModule)
  },
  {
    path: 'qr-code',
    loadChildren: () => import('./qr-code/qr-code.module').then( m => m.QrCodePageModule)
  },
  {
    path: 'match-day',
    loadChildren: () => import('./match-day/match-day.module').then( m => m.MatchDayPageModule)
  },
  {
    path: 'verify',
    loadChildren: () => import('./verify/verify.module').then( m => m.VerifyPageModule)
  },
  {
    path: 'shortlisted',
    loadChildren: () => import('./shortlisted/shortlisted.module').then( m => m.ShortlistedPageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./additional-pages/history/history.module').then( m => m.HistoryPageModule)
  },
  {
    path: 'dp-match',
    loadChildren: () => import('./dp-match/dp-match.module').then( m => m.DpMatchPageModule)
  },
  {
    path: 'jj-match',
    loadChildren: () => import('./jj-match/jj-match.module').then( m => m.JjMatchPageModule)
  },
  {
    path: 'mutual-match',
    loadChildren: () => import('./mutual-match/mutual-match.module').then( m => m.MutualMatchPageModule)
  },
  {
    path: 'verified-match',
    loadChildren: () => import('./verified-match/verified-match.module').then( m => m.VerifiedMatchPageModule)
  },
  {
    path: 'comp-match',
    loadChildren: () => import('./comp-match/comp-match.module').then( m => m.CompMatchPageModule)
  },
  {
    path: 'looking',
    loadChildren: () => import('./looking/looking.module').then( m => m.LookingPageModule)
  },
  {
    path: 'cache',
    loadChildren: () => import('./additional-pages/cache/cache.module').then( m => m.CachePageModule)
  },
  {
    path: 'upload-photos',
    loadChildren: () => import('./upload-photos/upload-photos.module').then( m => m.UploadPhotosPageModule)
  },
  {
    path: 'email-login',
    loadChildren: () => import('./email-login/email-login.module').then( m => m.EmailLoginPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }