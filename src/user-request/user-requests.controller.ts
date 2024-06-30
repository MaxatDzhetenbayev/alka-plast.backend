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
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UserRequest } from './user-request.entity';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { UserRequestService } from './user-requests.service';
import { CreateUserRequestDto } from './dto/create-user-request.dto';

@Controller('user-requests')
export class RequestController {
  constructor(private usersRequestService: UserRequestService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.User, Role.Admin)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createRequest(@Body() requestDto: CreateUserRequestDto, @Request() req) {
    try {
      return this.usersRequestService.createRequest(requestDto, req.user.id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  //   @UseGuards(RolesGuard)
  //   @Roles(Role.Admin)
  updateRequest(
    @Body() requestDto: CreateUserRequestDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    try {
      return this.usersRequestService.updateRequest(requestDto, id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
