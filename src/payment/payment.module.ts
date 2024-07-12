import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { UserRequestsModule } from 'src/user-request/user-requests.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payment } from './entities/payment.entity';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports: [UserRequestsModule, SequelizeModule.forFeature([
    Payment
  ])],
})
export class PaymentModule {}
