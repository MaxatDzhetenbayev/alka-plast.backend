import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  HttpException,
  HttpStatus,
  HttpCode,
  Patch,
  Param,
  ParseIntPipe,
  Get,
  Query,
  Request,
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
  @Roles(Role.User, Role.Manager, Role.Admin)
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
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Manager, Role.Worker, Role.User)
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

  @Get('find/:status')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Manager, Role.Worker)
  getRequestsByStatus(@Param('status') status: string) {
    console.log('working');
    try {
      return this.usersRequestService.getRequestsByStatus(status);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Manager, Role.Worker)
  getRequests(@Request() req) {
    try {
      return this.usersRequestService.getRequests(req.user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('user')
  @UseGuards(RolesGuard)
  @Roles(Role.User)
  getRequestsByUserId(@Request() req) {
    try {
      console.log('req.user', req.user);
      return this.usersRequestService.getRequestsByUserId(req.user.id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Manager, Role.Worker, Role.User)
  getRequestById(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.usersRequestService.getRequestById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Get('workers/:id/busy-times')
  getWorkerBudyTimes(@Param('id', ParseIntPipe) worker_id: number) {
    try {
      return this.usersRequestService.getWorkerBusyTimes(worker_id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('get/statistics')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  getStatistics() {
    try {
      return this.usersRequestService.getStatistics();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

//   @Get('workers/:id/average-work-time')
//   getAverageWorkTimeByWorker(@Param('id', ParseIntPipe) worker_id: number) {
//     try {
//       return this.usersRequestService.getAverageWorkTime(worker_id);
//     } catch (error) {}
//   }
}
