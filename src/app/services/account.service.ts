import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../enviroment/enviroment';
import { Observable } from 'rxjs';
import { Account } from '../models/Account';
import { of, throwError } from 'rxjs';

interface ApiResponse {
     email: string;
     name: string;
   username: string;
}
interface registerResponse {
    token: string
}
 interface CreateAccountRequest {
     email: string;
    password: string
   }

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    private readonly apiUrl = environment.apiUrl + "Accounts/";

    constructor(private http: HttpClient) { }

     register(accountData: CreateAccountRequest): Observable<any> {
       return this.http.post<any>(`${this.apiUrl}create`, accountData);
   }

   GetAccount(id: number): Observable<Account> {
        return this.http.post<Account>(environment.apiUrl +`Auth/register`, { id });
    }
   DelAcc(id: number): Observable<any> {
     return this.http.delete<any>(`${this.apiUrl}DelAcc?id=${id}`);
  }

  changeEmail(accountId: number, newEmail: string): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}ChangeEmail?accountId=${accountId}`, { newEmail });
  }
  changePassword(accountId: number, newPassword: string): Observable<any> {
     return this.http.put<any>(`${this.apiUrl}ChangePassword?accountId=${accountId}`, { newPassword });
  }

   changeUsername(accountId: number, newUsername: string): Observable<any> {
     return this.http.put<any>(`${this.apiUrl}ChangeUsername?accountId=${accountId}`, { NewUsername: newUsername });
   }
}