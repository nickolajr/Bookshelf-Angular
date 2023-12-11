import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  UserName: string = "";
  Password: string = "";
  
  constructor(private loginService: LoginService, private router: Router) { }

  login() {
    this.loginService.login(this.UserName, this.Password).subscribe(
      (data: any) => {
        if (data.accountId) {
          sessionStorage.setItem('accountId', data.accountId); 
          this.router.navigate(['/library']);
        } else {
          console.log(data);
          alert('Login failed');
        }
      },
      (error: any) => {
        console.log(error);
        alert('Login failed');
      }
    );
  }
}
