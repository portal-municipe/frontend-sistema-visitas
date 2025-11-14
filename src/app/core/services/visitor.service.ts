// src/app/core/services/visitor.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { MockDB } from '@app/core/mock/mock-db';
import { Visitor } from '@app/core/models/index';
import { toVisitorModel, toVisitorDto } from '@app/core/mappers/index';

@Injectable({ providedIn: 'root' })
export class VisitorService {
  list(): Observable<Visitor[]> {
    return of(MockDB.visitors.map(toVisitorModel));
  }

  search(term: string): Observable<Visitor[]> {
    const t = (term || '').toLowerCase().trim();

    return this.list().pipe(
      map((visitors: Visitor[]) =>
        visitors.filter(v =>
          (v.nome && v.nome.toLowerCase().indexOf(t) > -1) ||
          (v.documento && v.documento.toLowerCase().indexOf(t) > -1) ||
          (v.empresa && v.empresa.toLowerCase().indexOf(t) > -1),
        ),
      ),
    );
  }

  create(v: Visitor): Observable<Visitor> {
    // guarda no mock como DTO
    MockDB.visitors.push(toVisitorDto(v));
    return of(v);
  }
}
