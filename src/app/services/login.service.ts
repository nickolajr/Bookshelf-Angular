import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly apiUrl = environment.apiUrl + "Accounts/";

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    
    const url = `${this.apiUrl}login?userName=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
  
   console.log(url);
    return this.http.get<any>(url);
  }
}