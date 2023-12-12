import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { environment } from '../enviroment/enviroment';

interface email {
  
}
@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {
  accountId: number=0;
  newEmail: string = ''; 
  private readonly apiUrl = environment.apiUrl + "Accounts/";

  constructor(private service: AccountService) { }

  ngOnInit(): void {
    this.GetAccount();
  }

  GetAccount() {
    // TODO: Get account and set accountId
  }

  changeEmail() {
    const accountId = sessionStorage.getItem('accountId');
  if (!accountId) {
    console.log('No accountId found in session storage');
    console.log(accountId);
    return;
  }
    this.service.changeEmail(parseInt(accountId), this.newEmail)
      .subscribe(
        () => alert('Email updated successfully'),
        (error: any) => alert('Error updating email: ' + error.message)
      );
  }
}