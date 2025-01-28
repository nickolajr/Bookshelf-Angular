import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../models/Account';
import { LoginService } from '../services/login.service';
import { Subscription, take  } from 'rxjs';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {


  constructor(private router: Router,private loginService:LoginService) {}
  public account: Account | null = null;
  private accountSubscription: Subscription | undefined;
  public isLoggedIn: boolean = false;
  ngOnInit(): void {

    this.accountSubscription = this.loginService.currentUser$
      .pipe(take(1))
      .subscribe({
        next: (account) => {
          this.account = account;
          this.isLoggedIn = this.loginService.convertToBoolean(this.account?.isLoggedin);
        },
        error: (error) => {
          console.error('Error fetching user account:', error);
          
        },
      });
    }
  

  logout() {
    // Remove the user's session data
    this.loginService.logout();

    // Redirect to the login page
    window.location.href = '/login';
  }
}