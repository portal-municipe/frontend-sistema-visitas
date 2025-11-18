import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ActiveVisit, FilterConfig, TableColumn } from '@app/core/models';

@Component({
  selector: 'app-active-visits',
  templateUrl: './active-visits.component.html',
  styleUrls: ['./active-visits.component.scss'],
})
export class ActiveVisitsComponent implements OnInit {
  filterForm: FormGroup;

  // filtros dinâmicos (usam chaves de i18n)
  filterConfig: FilterConfig[] = [
    { name: 'search', label: 'visits.filters.search_label', type: 'text', placeholder: 'visits.filters.search_placeholder', class: 'col-span-2' },
  ];

  columns: TableColumn[] = [
    { key: 'visitante', header: 'visits.table.visitor' },
    { key: 'localizacao', header: 'visits.table.department' },
    { key: 'motivo', header: 'visits.table.reason' },
    { key: 'duracao', header: 'visits.table.duration', align: 'center', width: '90px' },
    { key: 'acoes', header: 'visits.table.actions', align: 'right', width: '140px' },
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

  exportActions = [
    { key: 'csv', label: 'visits.export.export', icon: 'cloud_download' },
  ];

  // linhas que vão para a tabela (referência estável)
  rows: any[] = [];

  // modal
  showingConfirm = false;
  visitToExit: ActiveVisit | null = null;

  // toast
  showToast = false;
  lastToastMsg = '';

  constructor(private fb: FormBuilder, private translate: TranslateService) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      search: [''],
    });

    this.buildRows();

    const searchCtrl = this.filterForm.get('search');
    if (searchCtrl) {
      searchCtrl.valueChanges.subscribe(() => {
        this.buildRows();
      });
    }
  }

  clearFilters(): void {
    // corrige reset para o nome correto do controle (search)
    this.filterForm.reset({ search: '' });
    this.buildRows();
  }

  private buildRows(): void {
    const searchCtrl = this.filterForm.get('search');
    const text = searchCtrl && searchCtrl.value
      ? String(searchCtrl.value).trim().toLowerCase()
      : '';

    const filtered = !text
      ? this.visits
      : this.visits.filter(v =>
        v.nome.toLowerCase().includes(text) ||
        v.empresa.toLowerCase().includes(text) ||
        v.anfitriao.toLowerCase().includes(text) ||
        v.departamento.toLowerCase().includes(text) ||
        v.motivo.toLowerCase().includes(text)
      );

    this.rows = filtered.map(v => ({
      id: v.id,
      visitante: v,
      anfitriao: v,
      localizacao: v,
      motivo: v.motivo,
      entrada: v.entrada,
      duracao: this.formatDuration(v.duracaoMin),
      acoes: v,
    }));
    console.log(this.rows);
  }

  get totalAtivos(): number {
    return this.rows.length;
  }

  initials(nome: string): string {
    if (!nome) {
      return '';
    }
    const p = nome.split(' ').filter(Boolean);
    if (p.length === 1) {
      return p[0].substr(0, 2).toUpperCase();
    }
    return (p[0][0] + p[p.length - 1][0]).toUpperCase();
  }

  formatDuration(min: number): string {
    const h = Math.floor(min / 60);
    const m = min % 60;
    if (h && m) {
      return `${h}h ${m}m`;
    }
    if (h) {
      return `${h}h`;
    }
    return `${m}m`;
  }

  // chamado quando a tabela emitir
  onTableCellAction(evt: { col: string; row: any }): void {
    if (evt.col === 'acoes') {
      const visit: ActiveVisit = evt.row.acoes;
      this.onOpenConfirm(visit);
    }
  }

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
    const visit = this.visitToExit;
    if (!visit) {
      return;
    }

    // remove da lista original
    this.visits = this.visits.filter(x => x.id !== visit.id);

    // rebuild das rows
    this.buildRows();

    // toast: usar i18n com interpolation para o subtítulo
    const dur = this.formatDuration(visit.duracaoMin);
    // ex: "António Carlos Silva - Duração: 2h 15m"
    this.lastToastMsg = this.translate.instant('visits.active.toast_success_sub', { name: visit.nome, duration: dur });
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 5000);

    // fecha modal
    this.showingConfirm = false;
    this.visitToExit = null;
  }

  onExport(action: string): void {
    if (action === 'csv') {
      this.exportCSV();
    }
  }

  exportCSV(): void {
    // manter lógica de export existente (adaptar se necessário para usar i18n nos headings)
  }

  onPage(e: any) {
    // se precisar de paginação server-side
  }
}