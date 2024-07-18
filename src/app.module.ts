import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
import { UserRequestsModule } from './user-request/user-requests.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/user.entity';
import { RequestHistory } from './user-request/request-history.entity';
import { RequestDetail } from './user-request/request-detail.entity';
import { UserRequest } from './user-request/user-request.entity';
import { WindowsModule } from './windows/windows.module';
import { Window } from './windows/entities/window.entity';
import { WindowItem } from './windows/entities/window-item.entity';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { WindowItemFeature } from './windows/entities/window-item-feature.entity';
import { PaymentModule } from './payment/payment.module';
import { ConfigModule } from '@nestjs/config';
import { Payment } from './payment/entities/payment.entity';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: 'secretKey',
        signOptions: { expiresIn: '10s' },
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'alka',
      logging: false,
      models: [
        User,
        UserRequest,
        RequestDetail,
        RequestHistory,
        Window,
        WindowItem,
        WindowItemFeature,
        Payment
      ],
    }),
    UsersModule,
    UserRequestsModule,
    WindowsModule,
    FilesModule,
    PaymentModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'auth/(.*)', method: RequestMethod.ALL },
        { path: 'uploads/(.*)', method: RequestMethod.GET },
        { path: 'windows', method: RequestMethod.GET },
        { path: 'windows/(.*)', method: RequestMethod.GET },
        { path: 'payment/(.*)', method: RequestMethod.ALL },
      )
      .forRoutes('*');
  }
}
