// src/app/features/visits/active-visits/active-visits.component.ts
import { Component } from '@angular/core';
import { ActiveVisit } from '@app/core/models/index';


@Component({
  selector: 'app-active-visits',
  templateUrl: './active-visits.component.html',
  styleUrls: ['./active-visits.component.scss'],
})
export class ActiveVisitsComponent {
  search = '';

  visits: ActiveVisit[] = [
    {
      id: 1,
      nome: 'António Carlos Silva',
      empresa: 'Banco Nacional de Angola',
      anfitriao: 'João Pedro Silva',
      departamento: 'Finanças',
      sala: 'Sala de Reuniões 1',
      motivo: 'Reunião de Trabalho',
      entrada: '12:36',
      duracaoMin: 135,
    },
    {
      id: 2,
      nome: 'Maria Santos Costa',
      empresa: 'Sonangol EP',
      anfitriao: 'Maria Santos Costa',
      departamento: 'Recursos Humanos',
      sala: 'Gabinete do Director',
      motivo: 'Entrega de Documentos',
      entrada: '13:36',
      duracaoMin: 90,
    },
    {
      id: 3,
      nome: 'Pedro Manuel Neto',
      empresa: 'TAAG Linhas Aéreas',
      anfitriao: 'Carlos Manuel Neto',
      departamento: 'Administração',
      sala: 'Escritório Geral',
      motivo: 'Consultoria',
      entrada: '14:06',
      duracaoMin: 45,
    },
  ];

  // para o modal
  showingConfirm = false;
  visitToExit: ActiveVisit | null = null;

  // toast
  showToast = false;
  lastToastMsg = '';

  get filteredVisits(): ActiveVisit[] {
    const t = this.search.trim().toLowerCase();
    if (!t) { return this.visits; }
    return this.visits.filter(v =>
      v.nome.toLowerCase().includes(t) ||
      v.empresa.toLowerCase().includes(t) ||
      v.anfitriao.toLowerCase().includes(t) ||
      v.departamento.toLowerCase().includes(t) ||
      v.motivo.toLowerCase().includes(t)
    );
  }

  get totalAtivos(): number {
    return this.filteredVisits.length;
  }

  initials(nome: string): string {
    if (!nome) { return ''; }
    const parts = nome.split(' ').filter(Boolean);
    if (parts.length === 1) { return parts[0].substr(0, 2).toUpperCase(); }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  formatDuration(min: number): string {
    const h = Math.floor(min / 60);
    const m = min % 60;
    if (h && m) { return `${h}h ${m}m`; }
    if (h) { return `${h}h`; }
    return `${m}m`;
  }

  // abrir modal
  onOpenConfirm(v: ActiveVisit): void {
    this.visitToExit = v;
    this.showingConfirm = true;
  }

  // fechar modal sem ação
  onCancelExit(): void {
    this.showingConfirm = false;
    this.visitToExit = null;
  }

  // confirmar saída
  onConfirmExit(): void {
    if (!this.visitToExit) { return; }

    // remove da lista
    this.visits = this.visits.filter(x => x.id !== this.visitToExit.id);

    // mostra toast
    const dur = this.formatDuration(this.visitToExit.duracaoMin);
    this.lastToastMsg = `${this.visitToExit.nome} - Duração: ${dur}`;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 5000);

    // fecha modal
    this.showingConfirm = false;
    this.visitToExit = null;
  }
}
