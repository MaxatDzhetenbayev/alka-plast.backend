import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { username },
    });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll({
      attributes: { exclude: ['passwordHash'] },
    });
  }

  async create({
    username,
    passwordHash,
    roles,
  }: Omit<User, 'id'>): Promise<User> {
    const user = await this.userRepository.create({
      username,
      passwordHash,
      roles,
    });
    return user;
  }
}
