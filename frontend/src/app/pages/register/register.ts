import { AuthService } from './../../services/auth/auth-service';
import { FormControl, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  form: FormGroup;
  constructor(private authService: AuthService, private router: Router) {
    this.form = new FormGroup({
      username: this.username,
      email: this.email,
      password: this.password,
    });
  }

  username = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  errorMessage: string = '';

  onSubmit(form: FormGroup) {
    if (this.username.invalid) {
      const errors = this.username.errors;
      if (errors?.['required']) {
        this.errorMessage = 'Username is required';
      } else if (errors?.['minlength']) {
        this.errorMessage = 'Username must be at least 3 characters long';
      }
      return;
    }
    if (this.email.invalid) {
      const errors = this.email.errors;
      if (errors?.['required']) {
        this.errorMessage = 'Email is required';
      } else if (errors?.['email']) {
        this.errorMessage = 'Email is not valid';
      }
      return;
    }
    if (this.password.invalid) {
      const errors = this.password.errors;
      if (errors?.['required']) {
        this.errorMessage = 'Password is required';
      } else if (errors?.['minlength']) {
        this.errorMessage = 'Password must be at least 6 characters long';
      }
      return;
    }

    this.errorMessage = '';

    const username = this.username.value ?? '';
    const email = this.email.value ?? '';
    const password = this.password.value ?? '';

    this.authService.register(username, email, password).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.errorMessage = error.message || 'Registration failed. Please try again.';
      },
    });
  }
}
