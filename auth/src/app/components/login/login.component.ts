import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  loginErrorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      identifier: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.loginErrorMessage = '';
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { identifier, password } = this.loginForm.value;

      this.authService.login({ identifier, password }).subscribe({
        next: (res) => {
          console.log('Login exitoso', res);
          window.location.href = 'https://www.irontec.com/quienes-somos/';
        },
        error: (err) => {
          console.error('Error al iniciar sesión', err);
          this.loginErrorMessage = 'Credenciales incorrectas. Intenta de nuevo.';
        },
      });
    }
  }
}
