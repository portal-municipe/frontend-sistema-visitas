// src/app/features/visits/visit-create/visit-create.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Visitor {
  id: number;
  nome: string;
  empresa?: string;
  documento?: string;
  telefone?: string;
}

@Component({
  selector: 'app-visit-create',
  templateUrl: './visit-create.component.html',
  styleUrls: ['./visit-create.component.scss'],
})
export class VisitCreateComponent implements OnInit {
  step = 1;

  // lista mockada de visitantes existentes
  visitors: Visitor[] = [
    {
      id: 1,
      nome: 'António Carlos Silva',
      empresa: 'Banco Nacional de Angola',
      documento: '004567890LA045',
      telefone: '+244 923 456 789',
    },
    {
      id: 2,
      nome: 'Maria Santos Costa',
      empresa: 'Sonangol EP',
      documento: '005678901LA046',
      telefone: '+244 921 444 222',
    },
    {
      id: 3,
      nome: 'Pedro Manuel Neto',
      empresa: 'TAAG Linhas Aéreas',
      documento: '006789012LA047',
      telefone: '+244 925 678 901',
    },
  ];

  selectedVisitor: Visitor | null = null;
  isNewVisitor = false;

  // forms
  newVisitorForm: FormGroup;
  visitDetailsForm: FormGroup;

  // selects do step 3
  hosts = [
    { id: 1, nome: 'João Pedro Silva - Finanças' },
    { id: 2, nome: 'Carlos Manuel Neto - Administração' },
  ];
  departments = [
    { id: 'FIN', nome: 'Finanças' },
    { id: 'RH', nome: 'Recursos Humanos (RH)' },
    { id: 'ADM', nome: 'Administração' },
    { id: 'ORC', nome: 'Orçamento' },
  ];
  motives = [
    { id: 'reuniao', nome: 'Reunião de Trabalho' },
    { id: 'documentos', nome: 'Entrega de Documentos' },
    { id: 'consultoria', nome: 'Consultoria' },
  ];
  areas = [
    'Gabinete do Director',
    'Sala de Reuniões 1',
    'Sala de Reuniões 2',
  ];

  showSuccess = false;

  constructor(private fb: FormBuilder) {
    this.newVisitorForm = this.fb.group({
      nome: ['', Validators.required],
      documento: ['', Validators.required],
      telefone: [''],
      empresa: [''],
    });

    this.visitDetailsForm = this.fb.group({
      anfitriao: [null, Validators.required],
      departamento: [null, Validators.required],
      area: [null],
      motivo: [null, Validators.required],
      observacoes: [''],
    });
  }

  ngOnInit(): void { }

  // STEP 1
  selectVisitor(v: Visitor): void {
    this.selectedVisitor = v;
    this.isNewVisitor = false;
  }

  goRegisterNewVisitor(): void {
    this.selectedVisitor = null;
    this.isNewVisitor = true;
    this.step = 2; // já vai logo para o form de novo visitante
  }

  nextFromStep1(): void {
    if (this.selectedVisitor) {
      this.isNewVisitor = false;
      this.step = 2; // mostra confirmação
    } else {
      // se não escolheu ninguém e não clicou “registar novo”, não avança
      return;
    }
  }

  // STEP 2
  backToStep1(): void {
    this.step = 1;
  }

  nextFromStep2(): void {
    if (this.isNewVisitor) {
      if (this.newVisitorForm.invalid) {
        this.newVisitorForm.markAsTouched();
        return;
      }
      // cria visitante “virtual” para mostrar no step 3 se precisares
      this.selectedVisitor = {
        id: 999,
        nome: this.newVisitorForm.value.nome,
        documento: this.newVisitorForm.value.documento,
        telefone: this.newVisitorForm.value.telefone,
        empresa: this.newVisitorForm.value.empresa,
      };
    }
    this.step = 3;
  }

  // STEP 3
  backToStep2(): void {
    this.step = 2;
  }

  submitVisit(): void {
    if (this.visitDetailsForm.invalid || !this.selectedVisitor) {
      this.visitDetailsForm.markAsTouched();
      return;
    }

    // aqui chamarias o teu service: this.visitService.create(...)
    // vou só simular sucesso
    this.showSuccess = true;
    setTimeout(() => (this.showSuccess = false), 5000);

    // reset para poder cadastrar outra
    this.step = 1;
    this.selectedVisitor = null;
    this.isNewVisitor = false;
    this.newVisitorForm.reset();
    this.visitDetailsForm.reset();
  }
}
