import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import Stripe from 'stripe';
import { UserRequestService } from 'src/user-request/user-requests.service';
@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(
    private readonly userRequestService: UserRequestService,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  }

  async createPaymentIntent(id: number) {

    const requestInfo = await this.userRequestService.getRequestById(id);

    if (!requestInfo) {
      throw new Error('Request not found');
    }

    const itemPrice = requestInfo.detail.item.price
    const calcHeight = requestInfo.detail.options.height / 100;
    const calcWidth = requestInfo.detail.options.width / 100;

    const createPaymentIntentDto = (() => Math.ceil(calcHeight * calcWidth * itemPrice))()
    
    
    
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: createPaymentIntentDto,
      currency: 'kzt',
    });

    return {
      clientSecret: paymentIntent.client_secret,
    };
  }

  findAll() {
    return `This action returns all payment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
