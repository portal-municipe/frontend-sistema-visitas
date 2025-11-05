import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Visitor } from '@app/core/models/index';
import { ConfirmDialogComponent } from '@app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.scss'],
})
export class VisitorsComponent {
  search = '';
  showModal = false;
  editing: Visitor | null = null;

  // 👉 toast
  showSuccess = false;
  successMessage = '';
  successSub = '';

  columns = [
    { key: 'nome', header: 'Nome Completo' },
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

  constructor(private dialog: MatDialog) { }

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

  /** chamado pelo modal */
  saveVisitor(v: Visitor): void {
    const isEdit = !!v.id;

    if (isEdit) {
      this.visitors = this.visitors.map(item => (item.id === v.id ? v : item));
      this.triggerToast('Visitante atualizado com sucesso!', `Visitante: ${v.nome}`);
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
      this.triggerToast('Visitante registado com sucesso!', `Visitante: ${v.nome}`);
    }

    this.showModal = false;
  }

  /** abre o dialog de confirmação e, se sim, apaga */
  delete(row: Visitor): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '360px',
      data: {
        title: 'Remover visitante',
        message: `Tem a certeza que deseja remover "${row.nome}"?`,
        confirmText: 'Remover',
        cancelText: 'Cancelar',
      },
    });

    ref.afterClosed().subscribe(ok => {
      if (ok) {
        this.visitors = this.visitors.filter(v => v.id !== row.id);
        this.triggerToast('Visitante removido com sucesso!', `Visitante: ${row.nome}`);
      }
    });
  }

  // evento vindo das células de ação
  onTableAction(e: { col: string; row: any }): void {
    if (e.col === 'edit') {
      this.openEdit(e.row);
    }
    if (e.col === 'delete') {
      this.delete(e.row);
    }
  }

  private triggerToast(title: string, sub: string): void {
    this.successMessage = title;
    this.successSub = sub;
    this.showSuccess = true;
    setTimeout(() => (this.showSuccess = false), 4500);
  }
}
