import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { UserRequest } from './user-request.entity';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { InjectModel } from '@nestjs/sequelize';
import { RequestDetail } from './request-detail.entity';
import { Sequelize } from 'sequelize-typescript';
import { WindowsService } from 'src/windows/windows.service';
import { WindowItem } from 'src/windows/entities/window-item.entity';
import { Role } from 'src/auth/role.enum';
import sequelize from 'sequelize';

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
  logger = new Logger(UserRequestService.name);

  async createRequest(dto: CreateUserRequestDto, userid: number) {
    const { detail, worker, ...main } = dto;
    console.log(worker);

    const transaction = await this.sequelize.transaction();
    try {
      const createdRequest = await this.requestRepository.create({
        ...main,
        user_id: userid,
      });

      const createdDetail = await this.detailRepository.create(
        {
          ...detail,
          status: 'pending',
          request_id: createdRequest.id,
          worker_id: worker.id,
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
      this.logger.error(error.message);
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

  async getRequests(user: any) {
    const workerOptions = user.roles.includes(Role.Worker)
      ? { where: { worker_id: user.id } }
      : {};

    return this.requestRepository.findAll({
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
          ...workerOptions,
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
            'worker_id',
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

  async getWorkerBusyTimes(worker_id: number) {
    try {
      const res = await this.requestRepository.findAll({
        include: [
          {
            model: RequestDetail,
            as: 'detail',
            attributes: ['instalation_date'],
            where: {
              worker_id,
              instalation_date: {
                [sequelize.Op.ne]: null,
              },
            },
            required: true,
          },
        ],
      });

      return res;
    } catch (error) {}
  }

  async getStatistics() {
    try {
      // Статистика по статусам запросов
      const statusCounts = await this.requestRepository.findAll({
        attributes: [
          [this.sequelize.col('detail.status'), 'status'],
          [
            this.sequelize.fn('COUNT', this.sequelize.col('detail.status')),
            'count',
          ],
        ],
        include: [{ model: RequestDetail, as: 'detail', attributes: [] }],
        group: ['detail.status'],
      });

      // Статистика по продажам на каждый день
      const dailySales = await this.requestRepository.findAll({
        where: {
          createdAt: { [sequelize.Op.ne]: null },
        },
        attributes: [
          [this.sequelize.fn('DATE', this.sequelize.col('createdAt')), 'date'],
          [this.sequelize.fn('COUNT', this.sequelize.col('id')), 'count'],
        ],
        group: [this.sequelize.fn('DATE', this.sequelize.col('createdAt'))],
      });

      // Статистика по ролям работников
      // const workerRoles = await this.userModel.findAll({
      //   attributes: [
      //     [this.sequelize.fn('UNNEST', this.sequelize.col('roles')), 'role'],
      //     [this.sequelize.fn('COUNT', this.sequelize.col('id')), 'count'],
      //   ],
      //   group: ['role'],
      // });

      // const avgProcessingTime = await this.requestRepository.findAll({
      //   attributes: [
      //     [
      //       this.sequelize.fn(
      //         'AVG',
      //         this.sequelize.literal(
      //           'EXTRACT(EPOCH FROM "detail"."instalation_date" - "detail"."createdAt") / 3600',
      //         ),
      //       ),
      //       'avg_processing_time_hours',
      //     ],
      //   ],
      //   include: [{ model: RequestDetail, as: 'detail', attributes: [] }],
      // });

      // Общее количество запросов
      const totalRequests = await this.requestRepository.count();

      return {
        statusCounts,
        dailySales,
        // workerRoles,
        //   avgProcessingTime,
        totalRequests,
      };
    } catch (error) {
      this.logger.log(error.message);
      throw new Error(error);
    }
  }

//   async getAverageWorkTime(worker_id: number) {
//     try {
//       const avgProcessingTime = await this.requestRepository.findAll({
//         attributes: [
//           [
//             this.sequelize.fn(
//               'AVG',
//               this.sequelize.literal(
//                 'EXTRACT(EPOCH FROM "detail"."instalation_date" - "detail"."createdAt") / 3600',
//               ),
//             ),
//             'avg_processing_time_hours',
//           ],
//         ],
//         include: [
//           {
//             model: RequestDetail,
//             as: 'detail',
//             where: { worker_id },
//             attributes: [],
//           },
//         ],
//       });

//       return avgProcessingTime;
//     } catch (error) {
//       this.logger.log(error.message);
//       throw new Error(error);
//     }
//   }
}
