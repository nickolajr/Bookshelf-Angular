import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { Account } from '../models/Account';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public account: Account | null = null;
  public isLoggedIn: boolean = false;
  public showDeleteModal: boolean = false;

  // Profile Picture
  public profilePicture: string | ArrayBuffer | null = null;

  // Edit States
  public editUsername: boolean = false;
  public editEmail: boolean = false;
  public editPassword: boolean = false;
  public newPassword: string = '';
  public editBio: boolean = false;

  constructor(
    private service: AccountService,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginService.currentUser$.subscribe((account) => {
      this.account = account;
      this.isLoggedIn = !!account;
    });
  }

  // Toggle Edit Fields
  toggleEdit(field: string): void {
    switch (field) {
      case 'username':
        this.editUsername = !this.editUsername;
        if (!this.editUsername) this.saveUsername();
        break;
      case 'email':
        this.editEmail = !this.editEmail;
        if (!this.editEmail) this.saveEmail();
        break;
      case 'password':
        this.editPassword = !this.editPassword;
        if (!this.editPassword) this.savePassword();
        break;
      case 'Bio':
        this.editBio = !this.editBio;
        if(!this.editBio) this.saveBio();
        break;
    }
      
  }

  // Save Username
  saveUsername(): void {
    if (this.account) {
      // Call API to update username
      console.log('Username updated to:', this.account.userName);
    }
  }

  // Save Email
  saveEmail(): void {
    if (this.account) {
      // Call API to update email
      console.log('Email updated to:', this.account.email);
    }
  }

  // Save Password
  savePassword(): void {
    if (this.newPassword) {
      // Call API to update password
      console.log('Password updated to:', this.newPassword);
      this.newPassword = ''; 
    }
  }
  saveBio(): void{
    if (this.account){
      //Call API to update Bio
      console.log('Bio updated to', this.account.Bio)
    }
  }

  // Profile Picture Upload
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePicture = reader.result;
        // Call API to upload profile picture
        console.log('Profile picture uploaded:', file);
      };
      reader.readAsDataURL(file);
    }
  }

  // Delete Account
  toggleDeleteModal(): void {
    this.showDeleteModal = !this.showDeleteModal;
  }

  DelAcc(): void {
    const accountId = sessionStorage.getItem('accountId');
    if (!accountId) return;

    this.service.DelAcc(parseInt(accountId)).subscribe(() => {
      console.log('Account deleted');
      sessionStorage.clear();
      this.router.navigate(['/login']);
    });
  }
}