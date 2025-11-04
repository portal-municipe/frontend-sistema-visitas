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

  columns: TableColumn[] = [
    { key: 'visitante', header: 'Visitante' },
    //{ key: 'anfitriao', header: 'Anfitrião' },
    { key: 'localizacao', header: 'Localização' },
    { key: 'motivo', header: 'Motivo' },
    { key: 'entrada', header: 'Entrada', align: 'center', width: '90px' },
    { key: 'duracao', header: 'Duração', align: 'center', width: '90px' },
    { key: 'acoes', header: 'Ações', align: 'right', width: '140px' },
  ];

  private visits: ActiveVisit[] = [
    {
      id: 1,
      nome: 'António Carlos Silva',
      empresa: 'Banco Nacional de Angola',
      anfitriao: 'João Pedro Silva',
      departamento: 'Finanças',
      sala: 'Sala de Reuniões 1',
      motivo: 'Reunião de Trabalho',
      entrada: '14:36',
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
      entrada: '15:36',
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
      entrada: '16:06',
      duracaoMin: 45,
    },
  ];

  // modal
  showingConfirm = false;
  visitToExit: ActiveVisit | null = null;

  // toast
  showToast = false;
  lastToastMsg = '';

  get filtered(): ActiveVisit[] {
    const t = this.search.trim().toLowerCase();
    if (!t) return this.visits;
    return this.visits.filter(v =>
      v.nome.toLowerCase().includes(t) ||
      v.empresa.toLowerCase().includes(t) ||
      v.anfitriao.toLowerCase().includes(t) ||
      v.departamento.toLowerCase().includes(t) ||
      v.motivo.toLowerCase().includes(t)
    );
  }

  get rows() {
    return this.filtered.map(v => ({
      id: v.id,
      visitante: v,
      anfitriao: v,
      localizacao: v,
      motivo: v.motivo,
      entrada: v.entrada,
      duracao: this.formatDuration(v.duracaoMin),
      acoes: v, // passa o próprio visitante para o template
    }));
  }

  get totalAtivos(): number {
    return this.filtered.length;
  }

  initials(nome: string): string {
    if (!nome) return '';
    const p = nome.split(' ').filter(Boolean);
    if (p.length === 1) return p[0].substr(0, 2).toUpperCase();
    return (p[0][0] + p[p.length - 1][0]).toUpperCase();
  }

  formatDuration(min: number): string {
    const h = Math.floor(min / 60);
    const m = min % 60;
    if (h && m) return `${h}h ${m}m`;
    if (h) return `${h}h`;
    return `${m}m`;
  }

  // <-- usa o mesmo nome que o HTML
  onOpenConfirm(v: ActiveVisit): void {
    console.log('onOpenConfirm', v);
    this.visitToExit = v;
    this.showingConfirm = true;
  }

  onCancelExit(): void {
    this.showingConfirm = false;
    this.visitToExit = null;
  }

  onConfirmExit(): void {
    if (!this.visitToExit) return;

    this.visits = this.visits.filter(x => x.id !== this.visitToExit!.id);

    const dur = this.formatDuration(this.visitToExit.duracaoMin);
    this.lastToastMsg = `${this.visitToExit.nome} - Duração: ${dur}`;
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 5000);

    this.showingConfirm = false;
    this.visitToExit = null;
  }
}

