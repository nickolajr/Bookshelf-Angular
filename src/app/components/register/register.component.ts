import { Component } from '@angular/core';
import { Router } from '@angular/router';
  import { FormGroup, FormControl, Validators } from '@angular/forms';
    import { AccountService } from 'src/app/services/account.service';
   import { LoginService } from 'src/app/services/login.service';
  interface CreateAccountRequest {
       email: string;
       password: string
      userName:string
   }

@Component({
     selector: 'app-register',
   templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
  })
export class RegisterComponent {
     registerForm = new FormGroup({
         UserName: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
        Password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  constructor(private accountService: AccountService, private loginService: LoginService, private router: Router) { }

   // Add to component class
isSubmitting = false;

// Update register method
register() {
  if (this.registerForm.valid) {
    this.isSubmitting = true;
    const registerRequest: CreateAccountRequest = {
      email: this.registerForm.value.Email!,
      password: this.registerForm.value.Password!,
      userName: this.registerForm.value.UserName!
    };

    this.accountService.register(registerRequest).subscribe({
      next: (data) => {
        console.log('Registration successful', data);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error(error);
        alert('Registration failed');
        this.isSubmitting = false;
      },
      complete: () => this.isSubmitting = false
    });
  }
}
}