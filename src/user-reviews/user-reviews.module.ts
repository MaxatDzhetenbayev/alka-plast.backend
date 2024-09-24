import { Module } from '@nestjs/common';
import { UserReviewsService } from './user-reviews.service';
import { UserReviewsController } from './user-reviews.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserReview } from './entities/user-review.entity';

@Module({
  controllers: [UserReviewsController],
  imports: [SequelizeModule.forFeature([UserReview])],
  providers: [UserReviewsService],
})
export class UserReviewsModule {}
