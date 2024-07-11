import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies['jwt'];
    if (!token) {
      return res.status(401).send('Unauthorized');
    }
    try {
      const decoded = this.jwtService.verify(token, { secret: 'secretKey' });
      req.user = decoded;
      // console.log('Token decoded successfully', decoded);
      next();
    } catch (err) {
      // console.log('Token verification failed', err.message);
      return res.status(401).send('Unauthorized');
    }
  }
}
