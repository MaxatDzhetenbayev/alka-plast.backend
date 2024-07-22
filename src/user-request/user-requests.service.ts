import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRequest } from './user-request.entity';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { InjectModel } from '@nestjs/sequelize';
import { RequestDetail } from './request-detail.entity';
import { Sequelize } from 'sequelize-typescript';
import { WindowsService } from 'src/windows/windows.service';
import { WindowItem } from 'src/windows/entities/window-item.entity';

@Injectable()
export class UserRequestService {
  constructor(
    @InjectModel(UserRequest)
    private requestRepository: typeof UserRequest,
    @InjectModel(RequestDetail)
    private detailRepository: typeof RequestDetail,
    private sequelize: Sequelize,
    private windowsService: WindowsService,
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

      return { ...createdRequest.dataValues, detail: createdDetail.dataValues };
    } catch (error) {
      await transaction.rollback();
      throw new Error(error);
    }
  }

  async updateRequest(dto: CreateUserRequestDto, id: number) {
    const { detail, ...main } = dto;

    const transaction = await this.sequelize.transaction();
    try {
      const request = await this.requestRepository.findByPk(id);

      if (!request) {
        throw new InternalServerErrorException('Request not found');
      }

      await request.update(main, { transaction });

      const requestDetail = await this.detailRepository.findOne({
        where: { request_id: id },
      });

      if (!requestDetail) {
        throw new InternalServerErrorException('Detail not found');
      }

      await requestDetail.update(detail, { transaction });

      await transaction.commit();

      return { ...request.dataValues, detail: requestDetail.dataValues };
    } catch (error) {
      await transaction.rollback();
      throw new Error(error);
    }
  }

  async getRequestsByStatus(status: string) {
    const includeWhere = status === 'all' ? {} : { status };

    return this.requestRepository.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'user_id'],
      },
      include: [
        {
          model: RequestDetail,
          as: 'detail',
          where: includeWhere,

          attributes: [
            'id',
            'instalation_date',
            'status',
            'measurement_date',
            'options',
          ],
          include: [
            {
              model: WindowItem,
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    });
  }

  async getRequestsByUserId(userId: number) {
    return this.requestRepository.findAll({
      where: { user_id: userId },

      include: [
        {
          model: RequestDetail,
          as: 'detail',
          attributes: [
            'id',
            'instalation_date',
            'status',
            'measurement_date',
            'options',
          ],
          include: [
            {
              model: WindowItem,
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    });
  }

  async getRequestById(id: number) {
    return this.requestRepository.findByPk(id, {
      include: [
        {
          model: RequestDetail,
          as: 'detail',
          include: [
            {
              model: WindowItem,
              attributes: ['id', 'name', 'price'],
            },
          ],
        },
      ],
    });
  }
}
