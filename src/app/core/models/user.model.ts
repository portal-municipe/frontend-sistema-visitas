export interface User {
  id: string;
  username: string;
  department: string;
  position: string;
  nome: string;
  perfil: 'ADMIN' | 'STAFF' | 'GUARD';
}
