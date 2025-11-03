// src/app/auth/login/login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;
  loading = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAsTouched();
      return;
    }
    this.loading = true;

    const username = this.form.value.username;
    const password = this.form.value.password;

    try {
      this.auth.login(username, password);
      this.router.navigate(['/']);
    } catch (e) {
      // TS 3.2: sem optional chaining
      const msg = e && (e as any).message ? (e as any).message : 'Falha ao autenticar';
      alert(msg);
    } finally {
      this.loading = false;
    }
  }

  get f() {
    return this.form.controls;
  }
}
