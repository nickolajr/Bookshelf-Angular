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
  TestFController = new FormControl();
  UserSuperHero:string = "";
  test(){
  this.UserSuperHero = this.TestFController.value;
  return this.UserSuperHero;
}
  title = 'superheroes001';
  //name and then type to define variable
  tal:number = 6;
  text:string = "i dunno know";
  text2:string = " life is meaningless";
  //name, type, and [] = an array
  myArray:number[] = [];
  myArray1:number[] = [5,10,15];
  mybool:boolean = true;
  HeroName:string = "Batman";
  HeroName1:string = "SuperMan";
  heroes:string[]=["Batman","SuperMan","SpiderMan"];
  toggleMyBool() {
    this.mybool = !this.mybool;
  }
  
}

