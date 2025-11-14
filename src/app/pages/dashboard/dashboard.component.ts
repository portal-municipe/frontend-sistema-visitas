import { Component, OnInit } from '@angular/core';
import { ForexService } from '@core/services/forex.service';
import { WeatherService } from '@core/services/weather.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  activeVisits = 8; // mock
  visitorsToday = 24; // mock
  avgTimeDisplay = '2h 15m';
  avgTimeDay = new Date().toLocaleDateString();


  forexMain = '';
  forexSub = '';


  tabIndex = 0;


  recentOpen = [ /* ...do teu mock de "active: true"... */];
  recentClosed = [ /* ...do teu mock de fechadas... */];


  departments = [
    { name: 'Finanças', value: 45, percent: 82 },
    { name: 'Recursos Humanos', value: 38, percent: 70 },
    { name: 'Administração', value: 32, percent: 58 },
    { name: 'Orçamento', value: 28, percent: 52 },
    { name: 'Outros', value: 19, percent: 40 },
  ];


  constructor(private fx: ForexService, private weather: WeatherService) { }


  ngOnInit(): void {
    this.loadForex();
    this.weather.getCurrentByCity('Luanda', 'AO').subscribe(); // exemplo de uso
  }


  private loadForex() {
    // Ex.: mostrar USD/AOA e EUR/AOA no cartão (apenas texto)
    this.fx.fetchOne('USD', 'AOA').subscribe(r => {
      const usd = r?.result?.AOA;
      this.fx.fetchOne('EUR', 'AOA').subscribe(r2 => {
        const eur = r2?.result?.AOA;
        this.forexMain = `USD/AOA ${usd?.toFixed?.(2)}`;
        this.forexSub = `EUR/AOA ${eur?.toFixed?.(2)}`;
      });
    });
  }
}
