import { Injectable } from '@nestjs/common';
import { UserRequest } from './user-request.entity';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserRequestService {
  constructor(
    @InjectModel(UserRequest)
    private requestRepository: typeof UserRequest,
  ) {}

  async createRequest(dto: CreateUserRequestDto) {
    return this.requestRepository.findAll();
  }
}
