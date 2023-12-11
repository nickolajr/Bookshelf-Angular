import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponent } from './components/Book/book.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';





//all our components and stuff
@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    LoginComponent
  ],
  //this is for all "finish modules" that we want to use
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  //some code we will rarely use
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
