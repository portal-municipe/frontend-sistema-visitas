// src/app/shared/components/app-sidebar/app-sidebar.component.ts
import { Component, EventEmitter, Input, Output, ChangeDetectorRef, OnInit } from '@angular/core';
import { NavItem } from '@core/models/index';
import { LanguageService } from '@core/services/language.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.scss']
})
export class AppSidebarComponent implements OnInit {
  @Input() opened = false;
  @Output() close = new EventEmitter<void>();

  constructor(public lang: LanguageService, private cdr: ChangeDetectorRef) { }

  nav: NavItem[] = [
    { icon: 'dashboard', labelKey: 'app.nav.dashboard', route: '/dashboard' },
    {
      icon: 'assignment',
      labelKey: 'app.nav.visits',
      children: [
        { labelKey: 'app.nav.visits_list', route: '/visitas' },
        { labelKey: 'app.nav.visits_new', route: '/visitas/novo' },
        { labelKey: 'app.nav.visits_active', route: '/visitas/ativas' }
      ]
    },
    {
      icon: 'people',
      labelKey: 'app.nav.visitors',
      children: [{ labelKey: 'app.nav.visitors_list', route: '/visitantes' }]
    },
    {
      icon: 'person',
      labelKey: 'app.nav.users',
      children: [
        { labelKey: 'app.nav.users_list', route: '/utilizadores' },
        { labelKey: 'app.nav.users_new', route: '/utilizadores/novo' }
      ]
    }
  ];

  openedGroups: { [key: string]: boolean } = {};
  toggleGroup(labelKey: string) { this.openedGroups[labelKey] = !this.openedGroups[labelKey]; }
  onNavigate(): void { this.close.emit(); }

  // troca o idioma e persiste em localStorage (feito no service)
  changeLang(code: 'pt' | 'en') {
    this.lang.set(code);
    Promise.resolve().then(() => this.cdr.detectChanges());
  }

  ngOnInit(): void {
    this.lang.set(this.lang.current, false);
  }
}
