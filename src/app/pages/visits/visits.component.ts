// src/app/features/visits/visits.component.ts
import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { VisitService } from '@app/core/services/visit.service';
import { Visit } from '@app/core/models/visit.model';

interface DeptOption { label: string; value: string | null; }
type FilterKey = 'q' | 'departamento' | 'dataInicial' | 'dataFinal';
interface FilterState {
  q: string;
  departamento: string | null;
  dataInicial: string | Date | null;
  dataFinal: string | Date | null;
}

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss'],
})
export class VisitsComponent implements OnInit, AfterViewInit, OnDestroy {
  form: FormGroup;

  /** snapshot dos dados originais */
  private allRows: Visit[] = [];

  /** dados filtrados para a tabela */
  dataSource = new MatTableDataSource<Visit>([]);
  displayed = ['data', 'visitante', 'anfitriao', 'departamento', 'motivo', 'entrada', 'saida', 'duracao'];
  total = 0;

  /** estado atual dos filtros (não dependemos do timing do FormGroup.value) */
  private filters: FilterState = {
    q: '',
    departamento: null,
    dataInicial: null,
    dataFinal: null,
  };

  departments: DeptOption[] = [
    { label: 'Todos os Departamentos', value: null },
    { label: 'Finanças', value: 'Finanças' },
    { label: 'Recursos Humanos', value: 'Recursos Humanos' },
    { label: 'Administração', value: 'Administração' },
    { label: 'Orçamento', value: 'Orçamento' },
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private subs = new Subscription();

  constructor(private fb: FormBuilder, private service: VisitService) {
    this.form = this.fb.group({
      q: [''],
      departamento: [null],
      dataInicial: [null],
      dataFinal: [null],
    });
  }

  ngOnInit(): void {
    this.load();

    // Pesquisa com debounce
    this.subs.add(
      this.form.controls.q.valueChanges
        .pipe(debounceTime(250), distinctUntilChanged())
        .subscribe((v: any) => this.applyFilters('q', v))
    );

    // Demais filtros - sem debounce
    this.subs.add(
      this.form.controls.departamento.valueChanges
        .subscribe((v: any) => this.applyFilters('departamento', v))
    );
    this.subs.add(
      this.form.controls.dataInicial.valueChanges
        .subscribe((v: any) => this.applyFilters('dataInicial', v))
    );
    this.subs.add(
      this.form.controls.dataFinal.valueChanges
        .subscribe((v: any) => this.applyFilters('dataFinal', v))
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private load(): void {
    this.service.list().subscribe((rows: Visit[]) => {
      this.allRows = rows || [];
      this.total = this.allRows.length;
      // aplica com o estado inicial (sem depender do form.value)
      this.applyFilters();
    });
  }

  /**
   * Aplica filtros.
   * - Se `key` e `value` forem passados, atualiza o estado local e filtra.
   * - Se não forem passados, usa o estado atual dos filtros.
   */
  applyFilters(key?: FilterKey, value?: any): void {
    if (key) {
      // atualiza o estado local, já normalizado quando útil
      if (key === 'q') {
        this.filters.q = (value || '').toString();
      } else if (key === 'departamento') {
        this.filters.departamento = value == null ? null : value.toString();
      } else if (key === 'dataInicial') {
        this.filters.dataInicial = value || null;
      } else if (key === 'dataFinal') {
        this.filters.dataFinal = value || null;
      }
    }

    // lemos APENAS do estado local
    const qNorm = (this.filters.q || '').toLowerCase().trim();
    const depNorm = (this.filters.departamento || '').toString().trim();

    const di = this.filters.dataInicial ? new Date(this.filters.dataInicial as any) : null;
    const df = this.filters.dataFinal ? new Date(this.filters.dataFinal as any) : null;
    if (df) df.setHours(23, 59, 59, 999);

    const filtered = this.allRows.filter((v: Visit) => {
      // texto
      const hitQ =
        !qNorm ||
        ((v.visitanteNome || '').toLowerCase().indexOf(qNorm) > -1) ||
        ((v.motivo || '').toLowerCase().indexOf(qNorm) > -1) ||
        ((v.anfitriao || '').toLowerCase().indexOf(qNorm) > -1) ||
        ((v.departamento || '').toLowerCase().indexOf(qNorm) > -1);

      // departamento (normalizado)
      const vDepNorm = (v.departamento || '').toString().trim();
      const hitDept = !depNorm || vDepNorm === depNorm;

      // datas
      const d = new Date(v.data);
      const hitDataIni = !di || d >= di;
      const hitDataFim = !df || d <= df;

      return hitQ && hitDept && hitDataIni && hitDataFim;
    });

    this.total = filtered.length;
    this.dataSource.data = filtered;

    // garantir paginação válida e update da tabela no Angular Material 7
    if (this.paginator) this.paginator.firstPage();
    if ((this.dataSource as any)._updateChangeSubscription) {
      (this.dataSource as any)._updateChangeSubscription();
    }
  }

  clearFilters(): void {
    // reseta o form (UI)
    this.form.reset({ q: '', departamento: null, dataInicial: null, dataFinal: null });
    // reseta o estado local
    this.filters = { q: '', departamento: null, dataInicial: null, dataFinal: null };
    // aplica com estado limpo
    this.applyFilters();
  }

  formatDuracao(min: number): string {
    if (min == null) return '—';
    const h = Math.floor(min / 60);
    const m = min % 60;
    if (h && m) return h + 'h ' + m + 'm';
    if (h) return h + 'h';
    return m + 'm';
  }

  exportCSV(): void {
    const rows = (this.dataSource.filteredData && this.dataSource.filteredData.length)
      ? this.dataSource.filteredData
      : this.dataSource.data;

    const headers = ['Data', 'Visitante', 'Anfitrião', 'Departamento', 'Motivo', 'Entrada', 'Saída', 'Duração'];
    const lines = rows.map((v: Visit) =>
      [
        new Date(v.data).toLocaleDateString(),
        v.visitanteNome,
        v.anfitriao || '',
        v.departamento || '',
        v.motivo || '',
        v.entrada || '',
        v.saida || '',
        this.formatDuracao(v.duracaoMin),
      ]
        .map(function (x: any) { return '"' + (x ? x.toString().replace(/"/g, '""') : '') + '"'; })
        .join(',')
    );

    const csv = [headers.join(','), ...lines].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'visitas_' + new Date().toISOString().slice(0, 10) + '.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  exportPDF(): void {
    alert('Hook para PDF: plugar jsPDF/autotable aqui quando preferires.');
  }
}
