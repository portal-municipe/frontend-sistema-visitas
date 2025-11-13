import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Visit } from '@app/core/models';

@Component({
  selector: 'app-visit-detail-modal',
  templateUrl: './visit-detail-modal.component.html',
  styleUrls: ['./visit-detail-modal.component.scss']
})
export class VisitDetailModalComponent {

  @Input() visit: Visit | null = null;
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }

  formatDuracao(min?: number): string {
    if (!min && min !== 0) return '—';
    const h = Math.floor(min / 60);
    const m = min % 60;
    if (h && m) return `${h}h ${m}m`;
    if (h) return `${h}h`;
    return `${m}m`;
  }

}
