import { Injectable, Logger } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ProfileService {
  private readonly logger = new Logger();
  constructor(
    @InjectModel(Profile)
    private profileRepository: typeof Profile,
  ) {}

  create(createProfileDto: CreateProfileDto) {
    return 'This action adds a new profile';
  }

  async findByUser(user_id: number) {
    try {
      const profile = await this.profileRepository.findOne({
        where: { user_id },

        attributes: {
          exclude: ['user_id'],
        },
      });

      if (!profile) {
        throw new Error('Profile not found');
      }
      return profile;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  findAll() {
    return `This action returns all profile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
