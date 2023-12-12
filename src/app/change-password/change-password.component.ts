import { Component } from '@angular/core';
import { AccountService } from '../services/account.service';
import { environment } from '../enviroment/enviroment';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  accountId: number=0;
  newPassword: string = ''; 
  private readonly apiUrl = environment.apiUrl + "Accounts/";

  constructor(private service: AccountService) { } 

  changePassword() {
    const accountId = sessionStorage.getItem('accountId');
    if (!accountId) {
      console.log('No accountId found in session storage');
      console.log(accountId);
      return;
    }
    this.service.changePassword(parseInt(accountId), this.newPassword)
      .subscribe(
        () => alert('Password updated successfully'),
        (error: any) => alert('Error updating email: ' + error.message)
      );
  }
}