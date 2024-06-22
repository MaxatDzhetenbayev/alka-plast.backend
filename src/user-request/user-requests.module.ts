import { Module } from '@nestjs/common';
import { RequestController } from './user-requests.controller';
import { UserRequestService } from './user-requests.service';
import { UserRequest } from './user-request.entity';
import { RequestDetail } from './request-detail.entity';
import { RequestHistory } from './request-history.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forFeature([UserRequest, RequestDetail, RequestHistory]),
  ],
  controllers: [RequestController],
  providers: [UserRequestService],
})
export class UserRequestsModule {}
