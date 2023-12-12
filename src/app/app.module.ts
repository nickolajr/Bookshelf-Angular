import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponent } from './components/Book/book.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Import FormsModule here
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { ChangeUsernameComponent } from './change-username/change-username.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RegisterComponent } from './components/register/register.component';
import { Location } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    LoginComponent,
    ProfileComponent,
    SettingsComponent,
    ChangePasswordComponent,
    ChangeEmailComponent,
    ChangeUsernameComponent,
    ToolbarComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule, // Add FormsModule to the imports array
    HttpClientModule
  ],
  providers: [Location],
  bootstrap: [AppComponent]
})
export class AppModule { }