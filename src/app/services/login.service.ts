import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../enviroment/enviroment';
interface AuthResponse {
      token: string;
    }

interface LoginRequest {
       userName: string;
       password: string;
    }
interface RegisterRequest {
       email: string;
       password: string;
   }

@Injectable({
      providedIn: 'root'
})
export class LoginService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
      isLoggedIn$ = this.isLoggedInSubject.asObservable();
    private apiUrl = environment.apiUrl+'Auth';

    constructor(private http: HttpClient, private router: Router) {
          const storedToken = localStorage.getItem('token');
            this.isLoggedInSubject.next(!!storedToken);
    }

    register(registerModel: RegisterRequest): Observable<object> {
          return this.http.post(`${this.apiUrl}/register`, registerModel)
   }

    login(loginModel: LoginRequest): Observable<AuthResponse> {
          return this.http.post<AuthResponse>(`${this.apiUrl}/login`, loginModel).pipe(
              tap((response)=> {
                  localStorage.setItem('token', response.token)
                 this.isLoggedInSubject.next(true)
              })
          );
     }

   logout(): void {
          localStorage.removeItem('token')
         this.isLoggedInSubject.next(false);
           this.router.navigate(['/login']);
      }

   setLogin(state: boolean): void{
         this.isLoggedInSubject.next(state)
      }
  }