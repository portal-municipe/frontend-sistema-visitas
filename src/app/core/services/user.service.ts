import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// tslint:disable-next-line:max-line-length
import { MockDB } from '@app/core/mock/mock-db';
import { User } from '@app/core/models/index';
import { toUserModel } from '@app/core/mappers/index';

@Injectable({ providedIn: 'root' })
export class UserService {
  list(): Observable<User[]> {
    return of(MockDB.users.map(toUserModel));
  }
}
