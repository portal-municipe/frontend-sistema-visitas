// src/app/pages/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { ForexService } from '@core/services/forex.service';
import { WeatherService } from '@core/services/weather.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  activeVisits = 8;          // mock
  visitorsToday = 24;        // mock
  avgTimeDisplay = '2h 15m';
  avgTimeDay = new Date().toLocaleDateString();

  forexMain = '';
  forexSub = '';

  tabIndex = 0;

  // põe aqui o teu mock real
  recentOpen = [
    {
      name: 'António Carlos',
      company: 'BNA',
      department: 'Finanças',
      host: 'João Pedro',
      time: '09:32',
    },
  ];

  recentClosed = [
    {
      name: 'Maria Santos',
      company: 'Sonangol',
      department: 'RH',
      host: 'Ana Paula',
      time: 'Ontem • 16:40',
    },
  ];

  departments = [
    { name: 'Finanças', value: 45, percent: 82 },
    { name: 'Recursos Humanos', value: 38, percent: 70 },
    { name: 'Administração', value: 32, percent: 58 },
    { name: 'Orçamento', value: 28, percent: 52 },
    { name: 'Outros', value: 19, percent: 40 },
  ];

  constructor(
    private fx: ForexService,
    private weather: WeatherService,
  ) {}

  ngOnInit(): void {
    this.loadForex();
    this.weather.getCurrentByCity('Luanda', 'AO').subscribe(); // só para “usar” o serviço
  }

  private loadForex(): void {
    this.fx.fetchOne('USD', 'AOA').subscribe(r => {
      const usdResult = r && r.result ? r.result.AOA : null;

      this.fx.fetchOne('EUR', 'AOA').subscribe(r2 => {
        const eurResult = r2 && r2.result ? r2.result.AOA : null;

        if (usdResult !== null && usdResult !== undefined) {
          this.forexMain = 'USD/AOA ' + usdResult.toFixed(2);
        } else {
          this.forexMain = 'USD/AOA —';
        }

        if (eurResult !== null && eurResult !== undefined) {
          this.forexSub = 'EUR/AOA ' + eurResult.toFixed(2);
        } else {
          this.forexSub = 'EUR/AOA —';
        }
      });
    });
  }
}
