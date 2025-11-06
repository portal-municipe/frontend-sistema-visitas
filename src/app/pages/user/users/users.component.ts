import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterConfig, TableColumn, User } from '@app/core/models';
import { UserService } from '@app/core/services';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  form: FormGroup;
  private subs = new Subscription();

  // dados de origem
  private allRows: User[] = [];

  // dados que vão pro <app-table>
  rowsView: any[] = [];

  total = 0;

  // filtros dinâmicos
  filterConfig: FilterConfig[] = [
    { name: 'q', label: 'Pesquisar', type: 'text', placeholder: 'Pesquisar...', class: 'col-span-2' },
  ];

  // colunas dinâmicas
  tableColumns: TableColumn[] = [
    { key: 'nomeCompleto', header: 'Nome' },
    { key: 'login', header: 'Login' },
    { key: 'departamento', header: 'Departamento' },
    { key: 'cargo', header: 'Cargo' },
    {
      key: 'perfil',
      header: 'Perfil'
      , align: 'center', width: '90px'
    },
    {
      key: 'status',
      header: 'Status'
      , align: 'center', width: '90px'
    },
    {
      key: 'acoes',
      header: 'Ações'
      , align: 'center', width: '90px'
    },
  ];


  exportActions = [
    { key: 'csv', label: 'Exportar', icon: 'cloud_download' },
  ];

  constructor(private fb: FormBuilder, private service: UserService) {
    this.form = this.fb.group({
      q: ['']
    });
  }

  ngOnInit(): void {
    this.load();

    // valueChanges
    this.subs.add(
      this.form.controls.q.valueChanges
        .pipe(debounceTime(250), distinctUntilChanged())
        .subscribe(v => this.applyFilters('q', v))
    );

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private load(): void {
    this.service.list().subscribe((rows: User[]) => {
      this.allRows = rows || [];
      this.applyFilters(); // inicial
    });
  }

  applyFilters(key?: 'q', value?: any): void {
    // lê direto do form (aqui pode, é o pai)
    const { q } = this.form.value;

    const qNorm = (q || '').toLowerCase().trim();

    const filtered = this.allRows.filter(u => {
      const hitQ =
        !qNorm ||
        (u.nome || '').toLowerCase().includes(qNorm) ||
        (u.perfil || '').toLowerCase().includes(qNorm) ||
        (u.username || '').toLowerCase().includes(qNorm);

      return hitQ;
    });

    this.total = filtered.length;

    // monta view-model para a tabela (para não acoplar a tabela ao cálculo)
    this.rowsView = filtered.map(u => ({
      ...u,
      nomeCompleto: u.nome,
      login: u.username,
      departamento: u.department,
      cargo: u.position,
      perfil: u.perfil,
      status: u['status'] || 'Ativo',
    }));
  }

  clearFilters(): void {
    this.form.reset({ q: '' });
    this.applyFilters();
  }

  /* formatDuracao(min: number): string {
    if (min == null) { return '—'; }
    const h = Math.floor(min / 60);
    const m = min % 60;
    if (h && m) { return `${h}h ${m}m`; }
    if (h) { return `${h}h`; }
    return `${m}m`;
  } */

  onExport(action: string): void {
    if (action === 'csv') {
      this.exportCSV();
    }
  }

  exportCSV(): void {
    // igual ao que já tinhas, mas usando this.rowsView
  }

  onPage(e: any) {
    // se precisar de paginação server-side
  }

  getPerfilColor(perfil: string): 'primary' | 'accent' | 'warn' | undefined {
    switch (perfil) {
      case 'ADMIN':
        return 'primary';
      case 'STAFF':
        return 'accent';
      case 'GUARD':
        return 'warn';
      default:
        return undefined;
    }
  }

  // ações da tabela
  verDetalhes(row: User) { console.log('Ver detalhes', row); }
  editar(row: User) { console.log('Editar', row); }
  excluir(row: User) { console.log('Excluir', row); }
}
