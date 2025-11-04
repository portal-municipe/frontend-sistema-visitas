// src/app/features/visits/visit-create/visit-create.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Visitor {
  id: number;
  nome: string;
  empresa?: string;
  documento?: string;
  telefone?: string;
}

export interface VisitDetailsPayload {
  anfitriao: number | string;
  departamento: string;
  area?: string;
  motivo: string;
  observacoes?: string;
}

@Component({
  selector: 'app-visit-create',
  templateUrl: './visit-create.component.html',
  styleUrls: ['./visit-create.component.scss'],
})
export class VisitCreateComponent {
  step = 1;
  showSuccess = false;

  visitors: Visitor[] = [
    { id: 1, nome: 'António Carlos Silva', empresa: 'Banco Nacional de Angola', documento: '004567890LA045', telefone: '+244 923 456 789' },
    { id: 2, nome: 'Maria Santos Costa', empresa: 'Sonangol EP', documento: '005678901LA046', telefone: '+244 921 444 222' },
    { id: 3, nome: 'Pedro Manuel Neto', empresa: 'TAAG Linhas Aéreas', documento: '006789012LA047', telefone: '+244 925 678 901' },
  ];

  selectedVisitor: Visitor | null = null;
  // se o utilizador clicou "registar novo" no step 1
  isNewVisitorFlow = false;

  // listas para o step 3
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
  areas = ['Gabinete do Director', 'Sala de Reuniões 1', 'Sala de Reuniões 2'];

  constructor(private fb: FormBuilder) { }

  /* ========== handlers do STEP 1 ========== */
  onVisitorSelected(v: Visitor): void {
    this.selectedVisitor = v;
    this.isNewVisitorFlow = false;
  }

  onStep1Next(): void {
    if (!this.selectedVisitor) {
      return;
    }
    this.step = 2;
  }

  onRegisterNewVisitor(): void {
    this.selectedVisitor = null;
    this.isNewVisitorFlow = true;
    this.step = 2;
  }

  /* ========== handlers do STEP 2 (confirmar existente) ========== */
  onStep2Back(): void {
    this.step = 1;
  }

  onStep2Confirm(): void {
    this.step = 3;
  }

  /* ========== handlers do STEP 2 (novo visitante) ========== */
  onNewVisitorSaved(v: Visitor): void {
    // veio do componente filho passo 2 (novo)
    this.selectedVisitor = { ...v, id: 999 }; // podes trocar quando integrar api
    this.isNewVisitorFlow = false;
    this.step = 3;
  }

  /* ========== handlers do STEP 3 ========== */
  onStep3Back(): void {
    this.step = 2;
  }

  onVisitSubmit(payload: VisitDetailsPayload): void {
    // aqui tu montas o objeto completo para enviar ao service
    const full = {
      visitante: this.selectedVisitor,
      ...payload,
    };
    // console.log('enviar para API:', full);

    this.showSuccess = true;
    setTimeout(() => (this.showSuccess = false), 5000);

    // reset fluxo
    this.step = 1;
    this.selectedVisitor = null;
    this.isNewVisitorFlow = false;
  }
}
