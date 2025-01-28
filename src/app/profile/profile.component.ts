import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { Account } from '../models/Account';
import { LoginService } from '../services/login.service';
import { Subscription, take  } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent{
  public account: Account | null = null;
  private accountSubscription: Subscription | undefined;
  public isLoggedIn: boolean = false;
  public isopen: boolean = false;

  constructor(
    private service: AccountService,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.accountSubscription = this.loginService.currentUser$
      .pipe(take(1))
      .subscribe({
        next: (account) => {
          this.account = account;
          this.isLoggedIn = this.convertToBoolean(this.account?.isLoggedin);
          console.log("isloggedin: " + this.account?.isLoggedin);
          console.log("isLoggedIn: " + this.isLoggedIn);         
        },
        error: (error) => {
          console.error('Error fetching user account:', error);
          // Handle error (e.g., display message)
        },
      });
  }
  private convertToBoolean(value: string | undefined): boolean {
    if (value === "1") {
      return true;
    } else if (value === "0") {
      return false;
    }
    throw new Error(`Invalid value: ${value}. Expected "1" or "0".`);
  }

  GetAccount() {
    if (this.account) {
      console.log('Account data:', this.account);
    } else {
      console.warn('No account data available.');
    }
  }
  

  DelAcc() {

    let accountId = sessionStorage.getItem('accountId');
    if (!accountId) return;
    this.service.DelAcc(parseInt(accountId)).subscribe(() => {
      console.log('Account deleted');
      // Clear the session storage
      sessionStorage.clear();
      // Redirect to the login page
      this.router.navigate(['/login']);
    });
  }
  toggle() {
    this.isopen = !this.isopen;
  }
}