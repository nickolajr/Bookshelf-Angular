import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BookComponent } from './components/Book/book.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';

// Settings sub-components
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { ChangeUsernameComponent } from './change-username/change-username.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'book', component: BookComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'settings', component: SettingsComponent, children: [
    { path: 'change-password', component: ChangePasswordComponent },
    { path: 'change-email', component: ChangeEmailComponent },
    { path: 'change-username', component: ChangeUsernameComponent },
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
