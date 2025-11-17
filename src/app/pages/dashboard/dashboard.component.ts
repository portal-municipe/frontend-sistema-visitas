import { Component, OnInit } from '@angular/core';
import { ForexService } from '@core/services/forex.service';
import { WeatherService } from '@core/services/weather.service';
import { DashboardKpi } from '@core/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  activeVisits = 8;
  visitorsToday = 24;
  avgTimeDisplay = '2h 15m';
  avgTimeDay = new Date().toLocaleDateString();

  forexMain = 'USD/AOA —';
  forexSub = 'EUR/AOA —';

  // meteorologia
  weatherTempDisplay = '-- °C';
  weatherSubLabel = 'A carregar previsão...';
  weatherIcon: string = 'wb_cloudy';

  tabIndex = 0;

  recentOpen = [/* ... */];
  recentClosed = [/* ... */];
  departments = [/* ... */];

  kpiCards: DashboardKpi[] = [];

  constructor(
    private fx: ForexService,
    private weather: WeatherService,
  ) { }

  ngOnInit(): void {
    // primeiro desenho com valores default
    this.buildKpis();

    // depois atualizamos à medida que os serviços respondem
    this.loadForex();
    this.loadWeather();
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

        // refresca o card de câmbio
        this.buildKpis();
      });
    });
  }

  private loadWeather(): void {
    this.weather.getCurrentByCity('Luanda', 'AO').subscribe((w: any) => {
      const main = w?.main;
      const weather0 = w?.weather?.[0];

      const temp = main?.temp;
      const feels = main?.feels_like;
      const desc = weather0?.description as string | undefined;
      const location = w?.name as string | undefined;

      if (typeof temp === 'number') {
        this.weatherTempDisplay = `${Math.round(temp)}°C`;
      } else {
        this.weatherTempDisplay = '-- °C';
      }

      const parts: string[] = [];

      if (desc) {
        parts.push(this.capitalize(desc)); // “céu nublado”, “chuva fraca”, etc.
      }
      if (typeof feels === 'number') {
        parts.push(`sensação ${Math.round(feels)}°C`);
      }
      if (location) {
        parts.push(location);
      }

      this.weatherSubLabel = parts.join(' • ');

      // escolhe ícone consoante condição
      const mainCond = (weather0?.main || '').toLowerCase();
      if (mainCond.includes('cloud')) {
        this.weatherIcon = 'cloud_queue';
      } else if (mainCond.includes('rain')) {
        this.weatherIcon = 'umbrella';
      } else if (mainCond.includes('storm') || mainCond.includes('thunder')) {
        this.weatherIcon = 'thunderstorm';
      } else if (mainCond.includes('clear')) {
        this.weatherIcon = 'wb_sunny';
      } else {
        this.weatherIcon = 'wb_cloudy';
      }

      // refresca o card do tempo
      this.buildKpis();
    });
  }

  private buildKpis(): void {
    this.kpiCards = [
      {
        label: 'Visitas ativas',
        value: this.activeVisits,
        sublabel: 'Atualizado a cada 5 min',
        variant: 'warning',
        icon: 'analytics',
      },
      {
        label: 'Visitantes',
        value: this.visitorsToday,
        sublabel: 'Atualizado diariamente',
        variant: 'default',
        icon: 'groups',
      },
      {
        label: 'Tempo médio',
        value: this.avgTimeDisplay,
        sublabel: this.avgTimeDay,
        variant: 'default',
        icon: 'schedule',
      },
      {
        label: 'Câmbio do dia',
        value: this.forexMain,
        sublabel: this.forexSub,
        variant: 'default',
        icon: 'paid', // ícone do card de conversões
      },
      {
        label: 'Tempo em Luanda',
        value: this.weatherTempDisplay,
        sublabel: this.weatherSubLabel,
        variant: 'default',
        icon: this.weatherIcon, // ícone do card de tempo (nublado, sol, chuva…)
      },
    ];
  }

  private capitalize(text: string): string {
    if (!text) { return text; }
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
