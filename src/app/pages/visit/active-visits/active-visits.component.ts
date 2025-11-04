// src/app/features/visits/active-visits/active-visits.component.ts
import { Component } from '@angular/core';
import { ActiveVisit, TableColumn } from '@app/core/models/index';

@Component({
  selector: 'app-active-visits',
  templateUrl: './active-visits.component.html',
  styleUrls: ['./active-visits.component.scss'],
})
export class ActiveVisitsComponent {
  search = '';

  // colunas que o app-table vai desenhar
  columns: TableColumn[] = [
    { key: 'visitante', header: 'Visitante' },
    { key: 'anfitriao', header: 'Anfitrião' },
    { key: 'localizacao', header: 'Localização' },
    { key: 'motivo', header: 'Motivo' },
    { key: 'entrada', header: 'Entrada' },
    { key: 'duracao', header: 'Duração' },
    { key: 'acoes', header: 'Ações' },
  ];

  // origem
  private visits: ActiveVisit[] = [
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

  // view que o app-table usa
  get rows(): any[] {
    return this.filtered.map(v => ({
      id: v.id,
      visitante: v,             // passo o obj inteiro pro template
      anfitriao: v,             // idem
      localizacao: v,
      motivo: v.motivo,
      entrada: v.entrada,
      duracao: this.formatDuration(v.duracaoMin),
      acoes: v,
    }));
  }

  // modal
  showingConfirm = false;
  visitToExit: ActiveVisit | null = null;

  // toast
  showToast = false;
  lastToastMsg = '';

  get filtered(): ActiveVisit[] {
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
    return this.filtered.length;
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

  onOpenConfirm(v: ActiveVisit): void {
    this.visitToExit = v;
    this.showingConfirm = true;
  }

  onCancelExit(): void {
    this.showingConfirm = false;
    this.visitToExit = null;
  }

  onConfirmExit(): void {
    const current = this.visitToExit;
    if (!current) {
      return;
    }

    // remove da lista
    this.visits = this.visits.filter(x => x.id !== current.id);

    // prepara toast
    const dur = this.formatDuration(current.duracaoMin);
    this.lastToastMsg = `${current.nome} - Duração: ${dur}`;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 5000);

    // limpa estado
    this.visitToExit = null;
    this.showingConfirm = false;
  }
}
