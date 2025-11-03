import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-void',
  templateUrl: './data-void.component.html',
  styleUrls: ['./data-void.component.scss'],
})
export class DataVoidComponent {
  @Input() titulo: string = 'Nenhum registo encontrado';
  @Input() descricao: string = 'Tente ajustar os filtros ou limpar a pesquisa.';
}
