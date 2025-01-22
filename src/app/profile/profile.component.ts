import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { Account } from '../models/Account';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  acc!: Account;
  isopen: boolean = false;
  constructor(private service:AccountService, private router: Router) {}

  ngOnInit(): void {
    this.GetAccount();
  }

  GetAccount() {
    let accountId = sessionStorage.getItem('accountId');
    if (!accountId) return;
    this.service.GetAccount(parseInt(accountId)).subscribe((response) => {
      console.log(response);
      this.acc = response;
    });
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