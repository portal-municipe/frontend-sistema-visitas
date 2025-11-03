import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form: FormGroup;
  loading = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          // letras OU números OU símbolos não garantem mix perfeito, mas orientam
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/),
        ],
      ],
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

    const { nome, email, username, password } = this.form.value;

    try {
      // Atualiza o service para aceitar email
      this.auth.register({ nome, email, username, password });
      this.router.navigate(['/auth/login']);
    } catch (e) {
      const msg = e && (e as any).message ? (e as any).message : 'Falha ao criar conta';
    } finally {
      this.loading = false;
    }
  }

  get f() {
    return this.form.controls;
  }
}
