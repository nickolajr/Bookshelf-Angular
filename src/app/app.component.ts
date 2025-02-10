import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { environment } from './enviroment/enviroment';

//this file is devided in 3 parts
//1. import statements "getting code from other files"
//2. component decorator = "line 10-14"
//3. component class

declare var particlesJS: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
//how many things are in classes //2
export class AppComponent {

  title = 'superheroes001';

  ngOnInit() {
    // Check session storage to see if user is logged in
    if (sessionStorage.getItem('accountId')) {
      environment.isLoggedIn = true;
    }
    particlesJS.load('particles-js', 'assets/particlesjs-config.json', function() {
      console.log('particles.js loaded...');
    });
  }

}

