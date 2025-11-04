import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Visitor } from '../../visit-create.component';

@Component({
  selector: 'app-visit-step2-new',
  templateUrl: './visit-step2-new.component.html',
  styleUrls: ['./visit-step2-new.component.scss'],
})
export class VisitStep2NewComponent implements OnInit {
  form: FormGroup;

  @Output() back = new EventEmitter<void>();
  @Output() saved = new EventEmitter<Visitor>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      documento: ['', Validators.required],
      telefone: [''],
      empresa: [''],
    });
  }

  onNext(): void {
    if (this.form.invalid) {
      this.form.markAsTouched();
      return;
    }
    this.saved.emit(this.form.value);
  }
}
