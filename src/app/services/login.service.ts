import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../enviroment/enviroment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Account } from '../models/Account';

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
    private apiUrl = environment.apiUrl + 'Auth';
    private jwtHelper = new JwtHelperService();

    //private tokenKey = 'token';
    private nameKey = 'name'; 
    private emailKey = 'email'; 
    private isLoggedInKey = 'isLoggedin';

    // Add an observable for the current user account
    private currentUserSubject = new BehaviorSubject<Account | null>(null);
    currentUser$ = this.currentUserSubject.asObservable();


    constructor(private http: HttpClient, private router: Router) {
        const storedToken = localStorage.getItem('token');
        this.isLoggedInSubject.next(!!storedToken);
        this.loadCurrentUser();
    }

    register(registerModel: RegisterRequest): Observable<object> {
        return this.http.post(`${this.apiUrl}/register`, registerModel);
    }

    login(loginModel: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/login`, loginModel).pipe(
            tap((response) => {
                localStorage.setItem('token', response.token);
                this.isLoggedInSubject.next(true);
                this.loadCurrentUser(); // Load user on login
            })
        );
    }

    logout(): void {
        localStorage.removeItem('token');
        this.isLoggedInSubject.next(false);
        this.currentUserSubject.next(null) // reset current user to null
        this.router.navigate(['/login']);
    }

    setLogin(state: boolean): void {
        this.isLoggedInSubject.next(state);
    }

    validateTokenAndGetClaims(): any | null {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                if (this.jwtHelper.isTokenExpired(token)) {
                    console.error('Token has Expired');
                    return null
                }
                return this.jwtHelper.decodeToken(token);
            } catch (error) {
                console.error('Error decoding or validating token', error);
                return null;
            }
        }
        return null;
    }
    public convertToBoolean(value: string | undefined): boolean {
        if (value === "1") {
          return true;
        } else if (value === "0") {
          return false;
        }
        throw new Error(`Invalid value: ${value}. Expected "1" or "0".`);
      }
    private loadCurrentUser() {
        try {
            const claims = this.validateTokenAndGetClaims();
          if (claims) {
             const account: Account = {
               id: claims.id,
               userName: claims[this.nameKey],
               email: claims[this.emailKey],
               isLoggedin: claims[this.isLoggedInKey]
             };
              console.log('Loaded Current User', account);
             this.currentUserSubject.next(account);
           } else {
             this.currentUserSubject.next(null);
           }
        } catch(error) {
          console.error('Error Loading User', error);
          this.currentUserSubject.next(null)
        }
    }
}