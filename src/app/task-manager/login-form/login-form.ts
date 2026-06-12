import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss'
})
export class LoginForm {

  loginError = '';
  isLoading = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.loginError = '';

    const email = this.loginForm.value.email!;
    const password = this.loginForm.value.password!;

    this.authService.findUserByEmail(email).subscribe({
      next: (users) => {
        const user = users.find(u => u.password === password);
        if (user) {
          this.authService.login(user);
          this.router.navigate(['/dashboard']);
        } else {
          this.loginError = 'Invalid email or password.';
        }
        this.isLoading = false;
      },
      error: () => {
        this.loginError = 'Invalid email or password.';
        this.isLoading = false;
      }
    });
  }
}