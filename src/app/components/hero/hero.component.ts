import { Component } from '@angular/core';
import { Hero } from 'src/app/models/Hero';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'tuesday', 
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
herolist:Hero[]=[

{Id:1,Name:"Superman",RealName:"Clark Kent",Place:"Krypton",DebutYear:new Date},
{Id:2,Name:"Batman",RealName:"Bruce Wayne",Place:"Gotham",DebutYear:new Date},
{Id:3,Name:"SpiderMan",RealName:"Peter Parker",Place:"Brooklin",DebutYear:new Date},
];

//it has a DI on the parameter
//this line tells us that we have a prop called service- its a design pattern
constructor(private service:HeroService) { 
  

}

getAll(){
  //data is a function that returns an array of heroes
  this.service.getAll().subscribe(data => {
    console.log(data);
    this.herolist = data;
  });

}
//Crud here
getAllold():Hero[]{
  let data = this.service.getAllHardcoded();
  console.log(data);
 return data;
}
getById(id:number):void{
  
  this.service.getById(id).subscribe(data => {
    console.log(data);
    return data;
  });
    

}
delete(id:number):void{

  let index = this.herolist.findIndex(h => h.Id == id);
  let found = this.herolist.splice(index,1);
  console.log(found);
  this.herolist.forEach(hero => console.log(hero));
}

create(hero:Hero):void{
  console.log(hero);
}
//Could be boolean
update(idToUpdate:number):void{
  //logic to get hero from id and then update data
  console.log(idToUpdate);
 
}


}
