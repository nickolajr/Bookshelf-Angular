import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = sessionStorage.getItem('accountId') != null;
  }

  logout() {
    // Remove the user's session data
    sessionStorage.removeItem('accountId');

    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}