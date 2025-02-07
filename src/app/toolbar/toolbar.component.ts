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
          console.log("loggedin"+this.isLoggedIn);
        },
        error: (error) => {
          console.error('Error fetching user account:', error);
          
        },
      });
    }
  

  logout() {
    
    this.loginService.logout();

    
    window.location.href = '/login';
  }
}