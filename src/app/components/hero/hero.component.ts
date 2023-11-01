import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero } from 'src/app/models/Hero';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'tuesday', 
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
herolist:Hero[]=[];

//it has a DI on the parameter
//this line tells us that we have a prop called service- its a design pattern
constructor(private service:HeroService) { 
  

}

getAll(){
  //data is a function that returns an array of heroes
  this.service.getAll().subscribe(data => {
    console.log(data);
    this.herolist = data;
    console.log(this.herolist);
  });

}
//Crud here
// getAllold():Hero[]{
//   let data = this.service.getAllHardcoded();
//   console.log(data);
//  return data;
// }
getById():void{
  const id = this.heroform.get('id')?.value; 
  this.service.getById(id).subscribe(data => {
    console.log(data);
    if (data) {
      this.herolist=[data];
    } else {
      this.herolist = [];
    }
  });
}
delete(id:number):void{

  let index = this.herolist.findIndex(h => h.id == id);
  let found = this.herolist.splice(index,1);
  console.log(found);
  //this.herolist.forEach(hero => console.log(hero));
  this.service.Delete(id).subscribe(data => {
    console.log(data);
  });
}
heroform = new FormGroup({
  id : new FormControl(),
  name : new FormControl(),
  realName : new FormControl(),
  place : new FormControl(),
  debutYear : new FormControl(),

});


create(hero:Hero):void{
  
  this.service.create(<Hero>this.heroform.value).subscribe(data => {
    console.log(data);
    this.herolist.push(data);
  });
}
//Could be boolean
update(idToUpdate:number):void{
  //logic to get hero from id and then update data
  console.log(idToUpdate);
 
}



}
