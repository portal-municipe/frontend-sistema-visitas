import { UserDto } from '@app/core/dto';

export const USERS_MOCK: UserDto[] = [
  {
    id: 'u1',
    username: 'admin',
    department: 'Tecnologia de Informação',
    position: 'Administrador de Sistemas',
    displayName: 'Administrador',
    role: 'ADMIN',
  },
  {
    id: 'u2',
    username: 'joao',
    department: 'Recursos Humanos',
    position: 'Gestor de RH',
    displayName: 'João Pedro',
    role: 'STAFF',
  },
  {
    id: 'u3',
    username: 'seg-01',
    department: 'Finanças',
    position: 'Analista Financeiro',
    displayName: 'Portaria 01',
    role: 'GUARD',
  },
];
