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
  isSubmitting = false;
  isPasswordVisible = false;  // New property for password visibility

  constructor(private loginService: LoginService, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      UserName: ['', [Validators.required]],
      Password: ['', [Validators.required]],
    });
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  ngAfterViewInit(): void { }

  login() {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      this.loginService.login(this.loginForm.value).subscribe({
        next: (data) => {
          this.router.navigate(['/library']);
        },
        error: (error) => {
          console.error(error);
          alert('Login failed');
          this.isSubmitting = false;
        },
        complete: () => this.isSubmitting = false
      });
    }
  }
}
