import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  loginForm: FormGroup;

  constructor(private loginService: LoginService, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      UserName: ['', [Validators.required]],
      Password: ['', [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    
  }

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)
      this.loginService.login(this.loginForm.value).subscribe(
        (data: any) => {
          this.router.navigate(['/library']);
        },
        (error: any) => {
          console.log(error);
          alert('Login failed');
        }
      );
    }
  }
}