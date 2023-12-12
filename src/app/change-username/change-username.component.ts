import { Component } from '@angular/core';
import { AccountService } from '../services/account.service';
import { environment } from '../enviroment/enviroment';

@Component({
  selector: 'app-change-username',
  templateUrl: './change-username.component.html',
  styleUrls: ['./change-username.component.css']
})
export class ChangeUsernameComponent {
  accountId: number=0;
  newUsername: string = ''; 
  private readonly apiUrl = environment.apiUrl + "Accounts/";

  constructor(private service: AccountService) { } 

  changeUsername() {
    const accountId = sessionStorage.getItem('accountId');
    if (!accountId) {
      console.log('No accountId found in session storage');
      console.log(accountId);
      return;
    }
    this.service.changeUsername(parseInt(accountId), this.newUsername)
      .subscribe(
        () => alert('UserName updated successfully'),
        (error: any) => alert('Error updating email: ' + error.message)
      );
  }
}
