import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '@app/core/models';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  form: FormGroup;

  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<User>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nomeCompleto: ['', Validators.required],
      documento: ['', Validators.required],
      telefone: ['', Validators.required],
      login: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      departamento: ['', Validators.required],
      cargo: ['', Validators.required],
      perfil: ['USER', Validators.required],
      ativo: [true],
    });
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAsTouched();
      return;
    }
    this.save.emit(this.form.value);
    this.form.reset({ perfil: 'USER', ativo: true });
  }

  onCancel(): void {
    this.cancel.emit();
  }

}
