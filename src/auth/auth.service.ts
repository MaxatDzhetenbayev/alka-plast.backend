import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcript from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && bcript.compare(password, user.passwordHash)) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      id: user.id,
      username: user.username,
      roles: user.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userDto: CreateUserDto) {
    try {
      const existingUser = await this.usersService.findOne(userDto.username);
      if (existingUser) {
        throw new Error('Такой пользователь уже существует');
      }

      const { password, ...user } = userDto;
      const passwordHash = await bcript.hash(password, 10);
      return this.usersService.create({
        ...user,
        passwordHash,
      });
    } catch (error) {
      throw new Error('Ошибка при регистрации пользователя');
    }
  }
}
