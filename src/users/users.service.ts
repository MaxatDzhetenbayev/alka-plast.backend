import { Injectable, UseGuards } from '@nestjs/common';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

class User {
  id: number;
  username: string;
  passwordHash: string;
  roles: string[];
}

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      username: 'john',
      passwordHash: 'changeme',
      roles: ['admin'],
    },
    {
      id: 2,
      username: 'chris',
      passwordHash: 'secret',
      roles: ['user'],
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async create({
    username,
    passwordHash,
    roles,
  }: Omit<User, 'id'>): Promise<User> {
    const user = {
      id: this.users.length + 1,
      username,
      passwordHash,
      roles,
    };
    this.users.push(user);
    return user;
  }
}
