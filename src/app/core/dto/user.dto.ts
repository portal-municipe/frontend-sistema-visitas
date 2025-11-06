export interface UserDto {
  id: string;
  username: string;
  department: string;
  position: string;
  displayName: string;
  role: 'ADMIN' | 'STAFF' | 'GUARD';
}
