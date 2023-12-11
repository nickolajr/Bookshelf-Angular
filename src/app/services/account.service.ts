import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../enviroment/enviroment';
import { Observable } from 'rxjs';
import { Account } from '../models/Account';

// interface Acc {
//   id: number;
//   name: string;
//   username: string;
//   email: string;
//   password: string;
//   isAdmin: boolean;
// }

interface ApiResponse {
  email: string;
  isAdmin: boolean;
  name: string;
  password: string;
  userName: string;
};
//decorator
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly apiUrl = environment.apiUrl + "Accounts/";
  
  constructor(private http: HttpClient) { }

  register(accountData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}Create`, accountData);
  }


  GetAccount(id: number): Observable<ApiResponse> {
    let body = JSON.stringify({
      id: id
    })

    let headers = { 'content-type': 'application/json' }

    let data = this.http.post<ApiResponse>(this.apiUrl + "GetAccInfo", body, { 'headers': headers } );
    return data;

  }

}