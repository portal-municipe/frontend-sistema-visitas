import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Visitor } from '@app/core/models/index';

@Component({
  selector: 'app-visit-step2-confirm',
  templateUrl: './visit-step2-confirm.component.html',
  styleUrls: ['./visit-step2-confirm.component.scss'],
})
export class VisitStep2ConfirmComponent {
  @Input() visitor: Visitor;
  @Output() back = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
}
