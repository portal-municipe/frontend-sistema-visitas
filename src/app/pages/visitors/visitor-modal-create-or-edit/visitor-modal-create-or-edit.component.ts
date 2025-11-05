// src/app/features/visitors/visitor-modal/visitor-modal.component.ts
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Visitor } from '@app/core/models/index';

@Component({
  selector: 'app-visitor-modal',
  templateUrl: './visitor-modal-create-or-edit.component.html',
  styleUrls: ['./visitor-modal-create-or-edit.component.scss'],
})
export class VisitorModalCreateOrEditComponent implements OnChanges {
  @Input() visitor: Visitor | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Visitor>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [null],
      nome: ['', Validators.required],
      documento: ['', Validators.required],
      telefone: [''],
      empresa: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.visitor) {
      if (this.visitor) {
        this.form.patchValue(this.visitor);
      } else {
        this.form.reset({ id: null, nome: '', documento: '', telefone: '', empresa: '' });
      }
    }
  }

  onClose(): void {
    this.close.emit();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAsTouched();
      return;
    }
    this.save.emit(this.form.value);
  }
}
