// src/app/features/visits/visits.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { VisitService } from '@app/core/services/visit.service';
import { Visit } from '@app/core/models/visit.model';
import { FilterConfig, TableColumn } from '@core/models/index';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss'],
})
export class VisitsComponent implements OnInit, OnDestroy {

  constructor(private fb: FormBuilder, private service: VisitService, private translate: TranslateService) {
    this.form = this.fb.group({
      q: [''],
      departamento: [null],
      dataInicial: [null],
      dataFinal: [null],
    });
    this.buildFilters();
    this.buildTableColumns();
    this.buildExportActions();
  }
  form: FormGroup;
  private subs = new Subscription();

  // dados de origem
  private allRows: Visit[] = [];

  // dados que vão pro <app-table>
  rowsView: any[] = [];

  total = 0;

  // filtros dinâmicos
  filterConfig: FilterConfig[] = [
    {
      name: 'q',
      label: 'visits.filters.search',
      type: 'text',
      placeholder: 'visits.filters.search_placeholder',
      class: 'col-span-2',
    },
    {
      name: 'departamento',
      label: 'visits.filters.department',
      type: 'select',
      options: [
        { label: 'visits.filters.department_all', value: null },
        { label: 'visits.filters.department_financas', value: 'Finanças' },
        { label: 'visits.filters.department_rh', value: 'Recursos Humanos' },
        { label: 'visits.filters.department_admin', value: 'Administração' },
        { label: 'visits.filters.department_orcamento', value: 'Orçamento' },
      ],
    },
    { name: 'dataInicial', label: 'visits.filters.date_start', type: 'date' },
    { name: 'dataFinal', label: 'visits.filters.date_end', type: 'date' },
  ];

  // colunas dinâmicas
  tableColumns: TableColumn[] = [
    { key: 'data', header: 'visits.table.date' },
    { key: 'visitanteNome', header: 'visits.table.visitor' },
    { key: 'departamento', header: 'visits.table.department' },
    { key: 'motivo', header: 'visits.table.reason' },
    { key: 'duracaoText', header: 'visits.table.duration' },
    { key: 'acoes', header: 'visits.table.actions', align: 'center', width: '90px' },
  ];

  exportActions = [
    { key: 'csv', label: 'visits.export.csv', icon: 'cloud_download' },
  ];

  showDetailModal = false;
  selectedVisit: Visit | null = null;

  ngOnInit(): void {
    this.load();

    // valueChanges
    this.subs.add(
      this.form.controls.q.valueChanges
        .pipe(debounceTime(250), distinctUntilChanged())
        .subscribe(v => this.applyFilters('q', v))
    );
    this.subs.add(this.form.controls.departamento.valueChanges.subscribe(v => this.applyFilters('departamento', v)));
    this.subs.add(this.form.controls.dataInicial.valueChanges.subscribe(v => this.applyFilters('dataInicial', v)));
    this.subs.add(this.form.controls.dataFinal.valueChanges.subscribe(v => this.applyFilters('dataFinal', v)));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private buildFilters(): void {
    this.filterConfig = [
      {
        name: 'q',
        label: 'visits.filters.search_label',
        type: 'text',
        placeholder: 'visits.filters.search_placeholder',
        class: 'col-span-2',
      },
      {
        name: 'departamento',
        label: 'visits.filters.department',
        type: 'select',
        options: [
          { label: 'visits.filters.department_all', value: null },
          { label: 'visits.filters.department_finance', value: 'Finanças' },
          { label: 'visits.filters.department_hr', value: 'Recursos Humanos' },
          { label: 'visits.filters.department_admin', value: 'Administração' },
          { label: 'visits.filters.department_budget', value: 'Orçamento' },
        ],
      },
      {
        name: 'dataInicial',
        label: 'visits.filters.date_start',
        type: 'date',
      },
      {
        name: 'dataFinal',
        label: 'visits.filters.date_end',
        type: 'date',
      },
    ];
  }

  private buildTableColumns(): void {
    this.tableColumns = [
      { key: 'data', header: 'visits.table.date' },
      { key: 'visitanteNome', header: 'visits.table.visitor' },
      { key: 'departamento', header: 'visits.table.department' },
      { key: 'motivo', header: 'visits.table.reason' },
      { key: 'duracaoText', header: 'visits.table.duration' },
      { key: 'acoes', header: 'visits.table.actions', align: 'center', width: '90px' },
    ];
  }

  private buildExportActions(): void {
    this.exportActions = [
      { key: 'csv', label: 'visits.export.export', icon: 'cloud_download' },
    ];
  }

  private load(): void {
    this.service.list().subscribe((rows: Visit[]) => {
      this.allRows = rows || [];
      this.applyFilters(); // inicial
    });
  }

  applyFilters(key?: 'q' | 'departamento' | 'dataInicial' | 'dataFinal', value?: any): void {
    // lê direto do form (aqui pode, é o pai)
    const { q, departamento, dataInicial, dataFinal } = this.form.value;

    const qNorm = (q || '').toLowerCase().trim();
    const depNorm = (departamento || '').toString().trim();
    const di = dataInicial ? new Date(dataInicial) : null;
    const df = dataFinal ? new Date(dataFinal) : null;
    if (df) { df.setHours(23, 59, 59, 999); }

    const filtered = this.allRows.filter(v => {
      const hitQ =
        !qNorm ||
        (v.visitanteNome || '').toLowerCase().includes(qNorm) ||
        (v.motivo || '').toLowerCase().includes(qNorm) ||
        (v.anfitriao || '').toLowerCase().includes(qNorm) ||
        (v.departamento || '').toLowerCase().includes(qNorm);

      const vDep = (v.departamento || '').toString().trim();
      const hitDept = !depNorm || vDep === depNorm;

      const d = new Date(v.data);
      const hitDi = !di || d >= di;
      const hitDf = !df || d <= df;

      return hitQ && hitDept && hitDi && hitDf;
    });

    this.total = filtered.length;

    // monta view-model para a tabela (para não acoplar a tabela ao cálculo)
    this.rowsView = filtered.map(v => ({
      ...v,
      data: v.data ? new Date(v.data).toLocaleDateString() : '',
      duracaoText: this.formatDuracao(v.duracaoMin),
      saida: v.saida || '—',
    }));
  }

  clearFilters(): void {
    this.form.reset({ q: '', departamento: null, dataInicial: null, dataFinal: null });
    this.applyFilters();
  }

  formatDuracao(min: number): string {
    if (min == null) { return '—'; }
    const h = Math.floor(min / 60);
    const m = min % 60;
    if (h && m) { return `${h}h ${m}m`; }
    if (h) { return `${h}h`; }
    return `${m}m`;
  }

  onExport(action: string): void {
    if (action === 'pdf') {
      this.exportPDF();
    }
    if (action === 'csv') {
      this.exportCSV();
    }
  }

  exportCSV(): void {
    // igual ao que já tinhas, mas usando this.rowsView
  }

  exportPDF(): void {
    alert('Hook para PDF');
  }

  onPage(e: any) {
    // se precisar de paginação server-side
  }

  verDetalhes(row: Visit): void {
    this.selectedVisit = row;
    console.log('Ver detalhes da visita', row);
    this.showDetailModal = true;
  }

  closeDetail(): void {
    this.showDetailModal = false;
  }
}
