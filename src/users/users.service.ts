import { Injectable, Logger } from '@nestjs/common';
import { User } from './user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { SaveUserDto } from './dto/save-user.dto';
import { UserReview } from 'src/user-reviews/entities/user-review.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import sequelize from 'sequelize';

@Injectable()
export class UsersService {
  private readonly logger = new Logger();
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

  async getWorkers(): Promise<User[]> {
    try {
      const workers = await this.userRepository.findAll({
        where: {
			
          roles: {
            [sequelize.Op.contains]: ['worker'],
          },
        },
        include: [
          {
            model: UserReview,
            as: 'user_reviews',
            attributes: [],
          },
          {
            model: Profile,
            as: 'profile',
            attributes: ['name', 'surname', 'image'],
          },
        ],
        attributes: {
          exclude: ['passwordHash'],
          include: [
            [
              sequelize.fn('AVG', sequelize.col('user_reviews.rating')),
              'rating',
            ],
          ],
        },
        group: ['User.id', 'profile.id'],
      });

      return workers;
    } catch (error) {
      this.logger.error('Error while getting workers', error);
    }
  }
}
