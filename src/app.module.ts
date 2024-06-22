import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
import { UserRequestsModule } from './user-request/user-requests.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    AuthModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: 'secretKey',
        signOptions: { expiresIn: '60m' },
      }),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'alka',
      models: [],
    }),
    UsersModule,
    UserRequestsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'users', method: RequestMethod.ALL },
        { path: 'user-requests', method: RequestMethod.ALL },
      );
  }
}
