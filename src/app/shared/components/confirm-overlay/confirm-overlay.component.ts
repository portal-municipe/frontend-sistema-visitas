import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-overlay',
  templateUrl: './confirm-overlay.component.html',
  styleUrls: ['./confirm-overlay.component.scss'],
})
export class ConfirmOverlayComponent {
  @Input() title = 'Confirmar';
  @Input() message = 'Tem a certeza desta ação?';
  @Input() show = false;

  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  onCancel() {
    this.cancel.emit();
  }

  onConfirm() {
    this.confirm.emit();
  }
}
