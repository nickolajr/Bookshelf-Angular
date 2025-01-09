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
import { ForumCreateComponent } from './forum/forum-create/forum-create.component';
import { ForumPageComponent } from './forum/forum-page/forum-page.component';
import { ForumPostComponent } from './forum/forum-post/forum-post.component';
import { PopularBooksComponent } from './popular-books/popular-books.component';
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
    ForumPageComponent,
    ForumPostComponent,
    ForumCreateComponent,
    PopularBooksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [Location],
  bootstrap: [AppComponent]
})
export class AppModule { }