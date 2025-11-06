import { User } from '@app/core/models/index';
import { UserDto } from '@app/core/dto/index';

export const toUserModel = (dto: UserDto): User => ({
  id: dto.id,
  username: dto.username,
  department: dto.department,
  position: dto.position,
  nome: dto.displayName,
  perfil: dto.role
});

export const toUserDto = (m: User): UserDto => ({
  id: m.id,
  username: m.username,
  department: m.department,
  position: m.position,
  displayName: m.nome,
  role: m.perfil
});
