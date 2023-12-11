import { Component } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent {

  constructor(private service: AccountService) { }

  ngOnInit(): void {
    this.GetAccount();
  }

  GetAccount() {
    return // TODO: Get account
  }
}
