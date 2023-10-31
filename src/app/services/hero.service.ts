import { Injectable } from '@angular/core';
import { Hero } from '../models/Hero';
import { HttpClient } from '@angular/common/http';
import { environment } from '../enviroment/enviroment';
import { Observable } from 'rxjs';

//decorator
@Injectable({
  providedIn: 'root'
})
//class
export class HeroService {
  

  private readonly apiUrl = environment.apiUrl + "SuperHero/";
  constructor(private http:HttpClient) { }



  herolist:Hero[]=[

    {Id:1,Name:"Superman",RealName:"Clark Kent",Place:"Krypton",DebutYear:new Date},
    {Id:2,Name:"Batman",RealName:"Bruce Wayne",Place:"Gotham",DebutYear:new Date},
    {Id:3,Name:"SpiderMan",RealName:"Peter Parker",Place:"Brooklin",DebutYear:new Date},
    ];
  
  getAllHardcoded():Hero[]{
    
    return this.herolist;
  }
  //observable is somthing that we listen to for data async
  getAll():Observable<Hero[]>{
    
    return this.http.get<Hero[]>(this.apiUrl);
  }
  getById(id:number):Observable<Hero>{
    return this.http.get<Hero>(this.apiUrl+id);
  } 
  Delete(id:number):void{

  } 
}
//connection to sa server happens like this
//cobber => xmlhttprequest => ajax=> and so on