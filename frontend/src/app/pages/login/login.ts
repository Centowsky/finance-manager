import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  form: FormGroup;
  constructor(private authService: AuthService, private router: Router) {
    this.form = new FormGroup({
      username: this.username,
      password: this.password,
    });
  }

  username = new FormControl('', [Validators.required, Validators.minLength(3)]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  errorMessage: string = '';

  onSubmit(form: FormGroup) {
    if (this.username.invalid) {
      const errors = this.username.errors;
      if (errors?.['required']) {
        this.errorMessage = 'Username is required';
      } else if (errors?.['minlength']) {
        this.errorMessage = 'Username error';
      }
      return;
    }

    if (this.password.invalid) {
      const errors = this.password.errors;
      if (errors?.['required']) {
        this.errorMessage = 'Password is required';
      } else if (errors?.['minlength']) {
        this.errorMessage = 'Password error';
      }
      return;
    }

    this.errorMessage = '';

    const username = this.username.value ?? '';
    const password = this.password.value ?? '';

    this.authService.login(username, password).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.errorMessage = error.message || 'Login failed. Please try again.';
      },
    });
  }
}
