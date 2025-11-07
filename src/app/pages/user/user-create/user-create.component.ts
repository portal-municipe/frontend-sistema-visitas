import { Component, OnInit } from '@angular/core';
import { User } from '@app/core/models';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent {

  showSuccess = false;
  savedUser: User | null = null;

  onSave(user: User): void {
    this.savedUser = user;
    this.showSuccess = true;
    setTimeout(() => (this.showSuccess = false), 5000);
  }

  onCancel(): void {
    // pode redirecionar para lista, ou limpar formulário
    console.log('Operação cancelada.');
  }
}
