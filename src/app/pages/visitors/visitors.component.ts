import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Visitor } from '@app/core/models/index';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.scss']
})
export class VisitorsComponent {
  search = '';
  showModal = false;
  editing: Visitor | null = null;

  // tabela
  columns = [
    { key: 'nome', header: 'Nome Completo' },
    // { key: 'documento', header: 'Documento', width: '140px' },
    { key: 'empresa', header: 'Empresa' },
    { key: 'telefone', header: 'Telefone', width: '150px' },
    { key: 'totalVisitas', header: 'Total Visitas', width: '110px', align: 'center' },
    { key: 'ultimaVisita', header: 'Última Visita', width: '120px' },
    { key: 'acoes', header: 'Ações', width: '80px', align: 'center' },
  ];

  visitors: Visitor[] = [
    {
      id: 1,
      nome: 'António Carlos Silva',
      documento: '004567890LA045',
      empresa: 'Banco Nacional de Angola',
      telefone: '+244 923 456 789',
      totalVisitas: 12,
      ultimaVisita: '28/10/2024',
    },
    {
      id: 2,
      nome: 'Maria Santos Costa',
      documento: '005678901LA046',
      empresa: 'Sonangol EP',
      telefone: '+244 924 567 890',
      totalVisitas: 8,
      ultimaVisita: '27/10/2024',
    },
    {
      id: 3,
      nome: 'Pedro Manuel Neto',
      documento: '006789012LA047',
      empresa: 'TAAG Linhas Aéreas',
      telefone: '+244 925 678 901',
      totalVisitas: 5,
      ultimaVisita: '26/10/2024',
    },
    {
      id: 4,
      nome: 'Ana Paula Rodrigues',
      documento: '007890123LA048',
      empresa: 'Ministério do Plano',
      telefone: '+244 926 789 012',
      totalVisitas: 15,
      ultimaVisita: '25/10/2024',
    },
  ];

  get filteredVisitors(): Visitor[] {
    const t = this.search.trim().toLowerCase();
    if (!t) {
      return this.visitors;
    }
    return this.visitors.filter(v =>
      v.nome.toLowerCase().includes(t) ||
      v.documento.toLowerCase().includes(t) ||
      (v.empresa || '').toLowerCase().includes(t) ||
      (v.telefone || '').toLowerCase().includes(t)
    );
  }

  get totalRegistados(): number {
    return this.visitors.length;
  }

  openNew(): void {
    this.editing = null;
    this.showModal = true;
  }

  openEdit(row: Visitor): void {
    this.editing = { ...row };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveVisitor(v: Visitor): void {
    if (v.id) {
      // update
      this.visitors = this.visitors.map(item => (item.id === v.id ? v : item));
    } else {
      const nextId = this.visitors.length
        ? Math.max(...this.visitors.map(x => x.id)) + 1
        : 1;
      this.visitors = [
        {
          ...v,
          id: nextId,
          totalVisitas: v.totalVisitas || 0,
          ultimaVisita: v.ultimaVisita || '-',
        },
        ...this.visitors,
      ];
    }
    this.showModal = false;
  }

  delete(row: Visitor): void {
    if (confirm(`Remover visitante "${row.nome}"?`)) {
      this.visitors = this.visitors.filter(v => v.id !== row.id);
    }
  }

  // quando vem evento do app-table (botão de ações projetado)
  onTableAction(e: { col: string; row: any }): void {
    if (e.col === 'edit') {
      this.openEdit(e.row);
    }
    if (e.col === 'delete') {
      this.delete(e.row);
    }
  }
}

