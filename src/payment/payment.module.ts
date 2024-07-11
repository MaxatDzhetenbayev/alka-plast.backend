import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { UserRequestsModule } from 'src/user-request/user-requests.module';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports: [UserRequestsModule],
})
export class PaymentModule {}
