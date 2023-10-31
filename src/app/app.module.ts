import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroComponent } from './components/hero/hero.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TeamComponent } from './components/team/team.component';
import { HttpClientModule } from '@angular/common/http';





//all our components and stuff
@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    TeamComponent
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
