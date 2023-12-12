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
  DelAcc(id: number): Observable<ApiResponse> {
    let headers = { 'content-type': 'application/json' };

    let data = this.http.delete<ApiResponse>(`${this.apiUrl}DelAcc?id=${id}`, { headers: headers });
    return data;
  }
  changeEmail(accountId: number, newEmail: string): Observable<any> {
    let headers = { 'content-type': 'application/json' };
    let body = { newEmail: newEmail };
    return this.http.put<any>(`${this.apiUrl}ChangeEmail?accountId=${accountId}`, body, { headers: headers });
  }
  changePassword(accountId: number, newPassword: string): Observable<any> {
    let headers = { 'content-type': 'application/json' };
    let body = { newPassword: newPassword };
    return this.http.put<any>(`${this.apiUrl}ChangePassword?accountId=${accountId}`, body, { headers: headers });
  }

  changeUsername(accountId: number, newUsername: string): Observable<any> {
    let headers = { 'content-type': 'application/json' };
    let body = { NewUsername: newUsername };
    return this.http.put<any>(`${this.apiUrl}ChangeUsername?accountId=${accountId}`, body, { headers: headers });
  }
}