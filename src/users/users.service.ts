import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { SaveUserDto } from './dto/save-user.dto';

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

  async create(user: SaveUserDto): Promise<User> {
    const response = await this.userRepository.create({
      ...user,
    });
    return response;
  }
}
