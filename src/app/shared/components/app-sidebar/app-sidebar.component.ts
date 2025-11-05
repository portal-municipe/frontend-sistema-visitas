import { Component, EventEmitter, Output } from '@angular/core';

export interface NavItem {
  icon: string;
  label: string;
  route?: string;
  children?: Array<{ label: string; route: string }>;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.scss']
})
export class AppSidebarComponent {
  @Output() toggle = new EventEmitter<void>();

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
        // { label: 'Cadastrar Visitante', route: '/visitantes/novo' },
      ],
    },
    {
      icon: 'person',
      label: 'Utilizadores',
      children: [
        { label: 'Listar Utilizadores', route: '/utilizadores' },
      ],
    },
  ];

  opened: { [key: string]: boolean } = {};

  toggleGroup(label: string) {
    this.opened[label] = !this.opened[label];
  }
}
