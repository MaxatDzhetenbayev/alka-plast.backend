import {
  Body,
  Controller,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res() res: Response) {
    const token = await this.authService.login(req.user);
    res.cookie('jwt', token.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    return res.send({ message: 'Login successful' });
  }

  @Post('register')
  async register(@Body() userDto: any) {
    return this.authService.register(userDto);
  }
}
