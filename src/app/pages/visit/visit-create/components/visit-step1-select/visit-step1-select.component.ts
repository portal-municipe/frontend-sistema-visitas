import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Visitor } from '../../visit-create.component';

@Component({
  selector: 'app-visit-step1-select',
  templateUrl: './visit-step1-select.component.html',
  styleUrls: ['./visit-step1-select.component.scss'],
})
export class VisitStep1SelectComponent {
  @Input() visitors: Visitor[] = [];
  @Input() selectedVisitor: Visitor | null = null;

  @Output() visitorSelect = new EventEmitter<Visitor>();
  @Output() newVisitor = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  onSelect(v: Visitor): void {
    this.visitorSelect.emit(v);
  }
}
