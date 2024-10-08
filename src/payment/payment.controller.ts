import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentService } from './payment.service';


@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('intent')
  create(@Body() createPaymentIntentDto: { requestId: string }) {
    return this.paymentService.createPaymentIntent(
      +createPaymentIntentDto.requestId,
    );
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @Post('purchase')
  save(@Body() body: any) {
    try {
      const event = body;
      if(event.type == 'payment_intent.succeeded') {
        console.log('payment_intent.succeeded')
        console.log(event.data.object)
        return this.paymentService.savePayment(event.data.object);
      }
      else if(event.type == 'charge.succeeded') {
        console.log('charge.succeeded')
        console.log(event.data.object)
        return this.paymentService.chargePayment(event.data.object);
      }
    } catch (error) {
        console.log(error)
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
