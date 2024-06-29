import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req, @Res() res: Response) {
    try {
      const token = await this.authService.login(req.user.dataValues);

      res.cookie('jwt', token.access_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });
      return res.send({ message: 'Успешная авторизация' });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() userDto: CreateUserDto) {
    try {
      return await this.authService.register(userDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
