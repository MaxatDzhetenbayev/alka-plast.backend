import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UserRequest } from './user-request.entity';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { UserRequestService } from './user-requests.service';
import { CreateUserRequestDto } from './dto/create-user-request.dto';

@Controller('user-requests')
export class RequestController {
  constructor(private usersService: UserRequestService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.User, Role.Admin)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createRequest(@Body() requestDto: CreateUserRequestDto, @Request() req) {
    try {
      return this.usersService.createRequest(requestDto, req.user.id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
