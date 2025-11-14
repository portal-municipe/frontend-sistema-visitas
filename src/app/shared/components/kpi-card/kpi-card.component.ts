import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-kpi-card',
  templateUrl: './kpi-card.component.html',
  styleUrls: ['./kpi-card.component.scss']
})
export class KpiCardComponent {
  @Input() label = '';
  @Input() value = '';
  @Input() sublabel = '';
  @Input() variant: 'default' | 'warning' = 'default';
}
