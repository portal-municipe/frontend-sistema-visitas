import { Component, OnInit } from '@angular/core';
import { WeatherService, ForexService } from '@core/services/index';
import { DashboardKpi } from '@core/models';
import { TranslateService } from '@ngx-translate/core';

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
  weatherIcon = 'wb_cloudy';

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

  kpiCards: DashboardKpi[] = [];

  constructor(
    private fx: ForexService,
    private weather: WeatherService,
    private translate: TranslateService,
  ) {
    this.translate.onLangChange.subscribe(() => this.buildKpis());
  }

  ngOnInit(): void {
    // primeiro desenho com valores default
    this.buildKpis();
    this.weatherSubLabel = this.translate.instant('dashboard.kpi.weather_sub_loading');
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
    this.weather.getCurrentByCity('Luanda', 'AO').subscribe(
      (w: any) => {
        if (!w) {
          this.weatherTempDisplay = '-- °C';
          this.weatherSubLabel = this.translate.instant('dashboard.kpi.weather_sub_empty');
          this.weatherIcon = 'wb_cloudy';
          this.buildKpis();
          return;
        }

        const main = w.main || {};
        const weatherArray = w.weather || [];
        const weather0 = weatherArray.length > 0 ? weatherArray[0] : {};

        const temp = typeof main.temp === 'number' ? main.temp : null;
        const feels = typeof main.feels_like === 'number' ? main.feels_like : null;
        const desc = (weather0.description as string) || '';
        const location = (w.name as string) || '';

        if (temp !== null) {
          this.weatherTempDisplay = `${Math.round(temp)}°C`;
        } else {
          this.weatherTempDisplay = '-- °C';
        }

        const parts: string[] = [];
        if (desc) {
          parts.push(this.capitalize(desc)); // "céu nublado", "chuva fraca", etc.
        }
        if (feels !== null) {
          parts.push(`sensação ${Math.round(feels)}°C`);
        }
        if (location) {
          parts.push(location);
        }
        this.weatherSubLabel = parts.join(' • ');

        // escolhe ícone consoante condição
        const mainCond = ((weather0.main as string) || '').toLowerCase();
        if (mainCond.indexOf('cloud') >= 0) {
          this.weatherIcon = 'cloud_queue';
        } else if (mainCond.indexOf('rain') >= 0) {
          this.weatherIcon = 'umbrella';
        } else if (
          mainCond.indexOf('storm') >= 0 ||
          mainCond.indexOf('thunder') >= 0
        ) {
          this.weatherIcon = 'thunderstorm';
        } else if (mainCond.indexOf('clear') >= 0) {
          this.weatherIcon = 'wb_sunny';
        } else {
          this.weatherIcon = 'wb_cloudy';
        }

        // refresca o card do tempo
        this.buildKpis();
      },
      () => {
        this.weatherTempDisplay = '-- °C';
        this.weatherSubLabel = this.translate.instant('dashboard.kpi.weather_sub_error');
        this.weatherIcon = 'wb_cloudy';
        this.buildKpis();
      }
    );
  }


  private buildKpis(): void {
    this.kpiCards = [
      {
        label: this.translate.instant('dashboard.kpi.active_visits'),
        value: this.activeVisits,
        sublabel: this.translate.instant('dashboard.kpi.active_visits_sub'),
        variant: 'warning',
        icon: 'analytics',
      },
      {
        label: this.translate.instant('dashboard.kpi.visitors'),
        value: this.visitorsToday,
        sublabel: this.translate.instant('dashboard.kpi.visitors_sub'),
        variant: 'default',
        icon: 'groups',
      },
      // se quiser reativar o tempo médio depois é só descomentar e criar as keys
      /*
      {
        label: this.translate.instant('dashboard.kpi.avg_time'),
        value: this.avgTimeDisplay,
        sublabel: this.avgTimeDay,
        variant: 'default',
        icon: 'schedule',
      },
      */
      {
        label: this.translate.instant('dashboard.kpi.exchange'),
        value: this.forexMain,
        sublabel: this.forexSub,
        variant: 'default',
        icon: 'paid',
      },
      {
        label: this.translate.instant('dashboard.kpi.weather'),
        value: this.weatherTempDisplay,
        sublabel: this.weatherSubLabel,
        variant: 'default',
        icon: this.weatherIcon,
      },
    ];
  }

  private capitalize(text: string): string {
    if (!text) { return text; }
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
