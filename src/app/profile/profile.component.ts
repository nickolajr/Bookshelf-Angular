import { Component } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Account } from '../models/Account';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(private service:AccountService) {}

  ngOnInit(): void {
    this.GetAccount();
  }

  acc = {
    email: '',
    isAdmin: false,
    name: '',
    password: '',
    userName: ''
  }

  GetAccount() {
    let accountId = sessionStorage.getItem('accountId');
    if (!accountId) return;
    this.service.GetAccount(parseInt(accountId)).subscribe((response) => {
      console.log(response);
      this.acc = response;
    }
    );
  }
}
