import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserReviewDto } from './dto/create-user-review.dto';
import { UpdateUserReviewDto } from './dto/update-user-review.dto';
import { UserReview } from './entities/user-review.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserReviewsService {
  constructor(
    @InjectModel(UserReview)
    private userReviewRepository: typeof UserReview,
  ) {}

  async create(createUserReviewDto: CreateUserReviewDto, user_id: number) {
    try {
      const userReview = await this.userReviewRepository.create({
        user_id,
        ...createUserReviewDto,
      });
      return userReview;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    try {
      const userReviews = await this.userReviewRepository.findAll();

      return userReviews;
    } catch (error) {
      console.log(error);
    }
  }

  async findByRequest(request_id: number) {
    try {
      const userReviews = await this.userReviewRepository.findAll({
        where: {
          user_request_id: request_id,
        },
      });

      return userReviews;
    } catch (error) {
      console.log(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} userReview`;
  }

  update(id: number, updateUserReviewDto: UpdateUserReviewDto) {
    return `This action updates a #${id} userReview`;
  }

  remove(id: number) {
    return `This action removes a #${id} userReview`;
  }
}
