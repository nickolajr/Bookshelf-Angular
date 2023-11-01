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

    {id:1,name:"Superman",realName:"Clark Kent",place:"Krypton",debutYear:new Date},
    {id:2,name:"Batman",realName:"Bruce Wayne",place:"Gotham",debutYear:new Date},
    {id:3,name:"SpiderMan",realName:"Peter Parker",place:"Brooklin",debutYear:new Date},
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
  create(hero: Hero):Observable<Hero> {
    return this.http.post<Hero>(`${this.apiUrl}`, hero);
  }
  Delete(id:number):Observable<Hero>{
    return this.http.delete<Hero>(this.apiUrl+id);
  } 
}
//connection to sa server happens like this
//cobber => xmlhttprequest => ajax=> and so on