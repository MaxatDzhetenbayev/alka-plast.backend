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
	 console.log(token)

    try {
      const decoded = this.jwtService.verify(token);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).send('Unauthorized');
    }
  }
}
