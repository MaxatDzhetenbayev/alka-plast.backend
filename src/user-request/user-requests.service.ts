import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRequest } from './user-request.entity';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { InjectModel } from '@nestjs/sequelize';
import { RequestDetail } from './request-detail.entity';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UserRequestService {
  constructor(
    @InjectModel(UserRequest)
    private requestRepository: typeof UserRequest,
    @InjectModel(RequestDetail)
    private detailRepository: typeof RequestDetail,
    private sequelize: Sequelize,
  ) {}

  async createRequest(dto: CreateUserRequestDto, userid: number) {
    const { detail, ...main } = dto;

    const transaction = await this.sequelize.transaction();
    try {
      const createdRequest = await this.requestRepository.create({
        ...main,
        user_id: userid,
      });

      const createdDetail = await this.detailRepository.create(
        {
          ...detail,
          request_id: createdRequest.id,
        },
        { transaction },
      );

      await transaction.commit();

      return createdRequest;
    } catch (error) {
      await transaction.rollback();
      throw new Error(error);
    }
  }
}
