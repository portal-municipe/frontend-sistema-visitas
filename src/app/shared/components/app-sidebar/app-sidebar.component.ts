// src/app/shared/components/app-sidebar/app-sidebar.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavItem } from '@core/models/index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.scss']
})
export class AppSidebarComponent {
  @Input() opened = false;
  @Output() close = new EventEmitter<void>();

  nav: NavItem[] = [
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    {
      icon: 'assignment',
      label: 'Visitas',
      children: [
        { label: 'Listar Visitas', route: '/visitas' },
        { label: 'Cadastrar Visita', route: '/visitas/novo' },
        { label: 'Visitas Ativas', route: '/visitas/ativas' },
      ],
    },
    {
      icon: 'people',
      label: 'Visitantes',
      children: [
        { label: 'Listar Visitantes', route: '/visitantes' },
      ],
    },
    {
      icon: 'person',
      label: 'Utilizadores',
      children: [
        { label: 'Listar Utilizadores', route: '/utilizadores' },
        { label: 'Cadastrar Utilizadores', route: '/utilizadores/novo' },
      ],
    },
  ];

  openedGroups: { [key: string]: boolean } = {};

  toggleGroup(label: string) {
    this.openedGroups[label] = !this.openedGroups[label];
  }

  // quando clicar num link em mobile, fecha o menu
  onNavigate(): void {
    this.close.emit();
  }
}
