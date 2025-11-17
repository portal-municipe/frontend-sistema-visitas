import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterConfig, Visitor } from '@app/core/models/index';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.scss'],
})
export class VisitorsComponent implements OnInit {
  filterForm: FormGroup;

  filterConfig: FilterConfig[] = [
    { name: 'search', label: 'Pesquisar', type: 'text', placeholder: 'Pesquisar visitante...', class: 'col-span-2' },
  ];

  columns = [
    { key: 'nome', header: 'Nome' },
    { key: 'empresa', header: 'Empresa' },
    { key: 'telefone', header: 'Telefone' },
    { key: 'totalVisitas', header: 'Total Visitas', align: 'center' },
    { key: 'ultimaVisita', header: 'Última Visita' },
    { key: 'acoes', header: 'Ações', align: 'right', width: '120px' },
  ];

  visitors: Visitor[] = [{ id: 1, nome: 'António Carlos Silva', documento: '004567890LA045', empresa: 'Banco Nacional de Angola', telefone: '+244 923 456 789', totalVisitas: 12, ultimaVisita: '28/10/2024', }, { id: 2, nome: 'Maria Santos Costa', documento: '005678901LA046', empresa: 'Sonangol EP', telefone: '+244 924 567 890', totalVisitas: 8, ultimaVisita: '27/10/2024', }, { id: 3, nome: 'Pedro Manuel Neto', documento: '006789012LA047', empresa: 'TAAG Linhas Aéreas', telefone: '+244 925 678 901', totalVisitas: 5, ultimaVisita: '26/10/2024', }, { id: 4, nome: 'Ana Paula Rodrigues', documento: '007890123LA048', empresa: 'Ministério do Plano', telefone: '+244 926 789 012', totalVisitas: 15, ultimaVisita: '25/10/2024', },];
  rows: any[] = [];

  exportActions = [
    { key: 'csv', label: 'Exportar', icon: 'cloud_download' },
  ];

  // modal
  showModal = false;
  editing: Visitor | null = null;

  // toast
  showSuccess = false;
  successMessage = "";
  successSub = "";

  constructor(private fb: FormBuilder) { }

  get totalRegistados() {
    return this.visitors.length;
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({ search: [''] });

    this.buildRows();

    this.filterForm.get('search').valueChanges.subscribe(() => {
      this.buildRows();
    });
  }

  buildRows() {
    const searchValue = this.filterForm.value.search;
    const text = searchValue
      ? searchValue.trim().toLowerCase()
      : '';

    const filtered = !text
      ? this.visitors
      : this.visitors.filter(v =>
        v.nome.toLowerCase().includes(text) ||
        v.empresa.toLowerCase().includes(text) ||
        v.telefone.toLowerCase().includes(text)
      );

    this.rows = filtered.map(v => ({
      ...v,
      acoes: v
    }));
  }


  initials(nome: string) {
    const p = nome.split(" ");

    const first = p[0] ? p[0][0] : '';
    const second = p[1] ? p[1][0] : '';

    return (first + second).toUpperCase();
  }


  clearFilters() {
    this.filterForm.reset({ search: '' });
    this.buildRows();
  }

  openNew() {
    this.editing = null;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onExport(action: string): void {
    if (action === 'csv') {
      this.exportCSV();
    }
  }

  exportCSV(): void {
    // igual ao que já tinhas, mas usando this.rowsView
  }

  saveVisitor(data: Visitor) {
    if (!data.id) {
      data.id = this.visitors.length + 1;
      this.visitors.push(data);
      this.successMessage = "Visitante registado!";
    } else {
      const idx = this.visitors.findIndex(v => v.id === data.id);
      this.visitors[idx] = data;
      this.successMessage = "Visitante atualizado!";
    }

    this.successSub = data.nome;
    this.showSuccess = true;
    setTimeout(() => (this.showSuccess = false), 5000);

    this.buildRows();
    this.closeModal();
  }

  onTableAction(evt: { col: string; row: any }) {
    if (evt.col === 'edit') {
      this.editing = evt.row;
      this.showModal = true;
    }

    if (evt.col === 'delete') {
      this.visitors = this.visitors.filter(v => v.id !== evt.row.id);
      this.buildRows();
    }
  }
}

