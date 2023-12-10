import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

//this file is devided in 3 parts
//1. import statements "getting code from other files"
//2. component decorator = "line 10-14"
//3. component class


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
//how many things are in classes //2
export class AppComponent {

  title = 'superheroes001';

}

