import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BookComponent } from './components/Book/book.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { RegisterComponent } from './components/register/register.component';
// Settings sub-components
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { ChangeUsernameComponent } from './change-username/change-username.component';
import { ForumPageComponent } from './forum/forum-page/forum-page.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'library', component: BookComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'register', component: RegisterComponent},
  {path: 'forum', component: ForumPageComponent},
  { path: 'settings', component: SettingsComponent, children: [
    { path: 'change-password', component: ChangePasswordComponent },
    { path: 'change-email', component: ChangeEmailComponent },
    { path: 'change-username', component: ChangeUsernameComponent },
   
  ] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
