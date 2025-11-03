// src/app/features/visits/visits.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VisitService } from '@app/core/services/visit.service';
import { Visit } from '@app/core/models/visit.model';

interface DeptOption { label: string; value: string | null; }

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss'],
})
export class VisitsComponent implements OnInit {
  form: FormGroup;
  dataSource = new MatTableDataSource<Visit>([]);
  displayed = ['data', 'visitante', 'anfitriao', 'departamento', 'motivo', 'entrada', 'saida', 'duracao'];
  total = 0;

  departments: DeptOption[] = [
    { label: 'Todos os Departamentos', value: null },
    { label: 'Finanças', value: 'Finanças' },
    { label: 'Recursos Humanos', value: 'Recursos Humanos' },
    { label: 'Administração', value: 'Administração' },
    { label: 'Orçamento', value: 'Orçamento' },
  ];

  @ViewChild(MatPaginator, { read: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { read: true }) sort: MatSort;

  constructor(private fb: FormBuilder, private service: VisitService) {
    this.form = this.fb.group({
      q: [''],
      departamento: [null],
      dataInicial: [null],
      dataFinal: [null],
    });
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.load();
    this.form.valueChanges.subscribe(() => this.applyFilters());
  }

  private load(): void {
    this.service.list().subscribe((rows) => {
      this.dataSource.data = rows;
      this.total = rows.length;
      this.applyFilters(); // aplica imediatamente filtros inicias
    });
  }

  applyFilters(): void {
    const { q, departamento, dataInicial, dataFinal } = this.form.value;

    const qNorm = (q || '').toString().toLowerCase().trim();
    const di = dataInicial ? new Date(dataInicial) : null;
    const df = dataFinal ? new Date(dataFinal) : null;
    if (df) df.setHours(23, 59, 59, 999);

    const all: Visit[] = (this.dataSource.data as Visit[]) || [];
    const filtered = all.filter((v) => {
      // texto
      const hitQ =
        !qNorm ||
        v.visitanteNome.toLowerCase().includes(qNorm) ||
        (v.motivo || '').toLowerCase().includes(qNorm) ||
        (v.anfitriao || '').toLowerCase().includes(qNorm) ||
        (v.departamento || '').toLowerCase().includes(qNorm);

      // departamento
      const hitDept = !departamento || v.departamento === departamento;

      // datas
      const d = new Date(v.data);
      const hitDataIni = !di || d >= di;
      const hitDataFim = !df || d <= df;

      return hitQ && hitDept && hitDataIni && hitDataFim;
    });

    this.total = filtered.length;
    // paginação/sort de Material esperam dataSource.data
    // então setamos num novo dataSource para resetar paginação
    const ds = new MatTableDataSource<Visit>(filtered);
    ds.paginator = this.paginator;
    ds.sort = this.sort;
    this.dataSource = ds;
    this.paginator.firstPage();
  }

  clearFilters(): void {
    this.form.reset({ q: '', departamento: null, dataInicial: null, dataFinal: null });
  }

  formatDuracao(min: number): string {
    if (min == null) return '—';
    const h = Math.floor(min / 60);
    const m = min % 60;
    if (h && m) return `${h}h ${m}m`;
    if (h) return `${h}h`;
    return `${m}m`;
  }

  // exports simples (CSV). PDF podes plugar jsPDF quando quiseres.
  exportCSV(): void {
    const rows = this.dataSource.filteredData || this.dataSource.data;
    const headers = ['Data', 'Visitante', 'Anfitrião', 'Departamento', 'Motivo', 'Entrada', 'Saída', 'Duração'];
    const lines = rows.map(v =>
      [
        new Date(v.data).toLocaleDateString(),
        v.visitanteNome,
        v.anfitriao || '',
        v.departamento || '',
        v.motivo || '',
        v.entrada || '',
        v.saida || '',
        this.formatDuracao(v.duracaoMin),
      ].map(x => `"${(x || '').toString().replace(/"/g, '""')}"`).join(',')
    );
    const csv = [headers.join(','), ...lines].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `visitas_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  exportPDF(): void {
    alert('Hook para PDF: plugar jsPDF/autotable aqui quando preferires.');
  }
}
