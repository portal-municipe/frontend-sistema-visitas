import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Visitor } from '../../visit-create.component';

@Component({
  selector: 'app-visit-step3-details',
  templateUrl: './visit-step3-details.component.html',
  styleUrls: ['./visit-step3-details.component.scss'],
})
export class VisitStep3DetailsComponent implements OnInit {
  @Input() hosts: { id: number | string; nome: string }[] = [];
  @Input() departments: { id: string; nome: string }[] = [];
  @Input() motives: { id: string; nome: string }[] = [];
  @Input() areas: string[] = [];

  @Output() back = new EventEmitter<void>();
  @Output() submitVisit = new EventEmitter<any>();

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      anfitriao: [null, Validators.required],
      departamento: [null, Validators.required],
      area: [null],
      motivo: [null, Validators.required],
      observacoes: [''],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAsTouched();
      return;
    }
    this.submitVisit.emit(this.form.value);
  }
}
