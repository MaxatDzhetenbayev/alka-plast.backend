import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import Stripe from 'stripe';
import { UserRequestService } from 'src/user-request/user-requests.service';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './entities/payment.entity';
@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(
    private readonly userRequestService: UserRequestService,
    @InjectModel(Payment) private paymentRepository: typeof Payment,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  async createPaymentIntent(id: number) {
    const requestInfo = await this.userRequestService.getRequestById(id);

    if (!requestInfo) {
      throw new Error('Request not found');
    }

    try {
      const itemPrice = requestInfo.detail.item.price;
      const calcHeight = requestInfo.detail.options.height / 100;
      const calcWidth = requestInfo.detail.options.width / 100;
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.ceil(calcHeight * calcWidth * itemPrice) * 100,
        currency: 'kzt',
        metadata: {
          requestId: id,
        },
      });

      return {
        clientSecret: paymentIntent.client_secret,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async savePayment(body: any) {
    await this.paymentRepository.create({
      payment_intent_id: body.id,
      amount: body.amount / 100,
      currency: body.currency,
      status: body.status,
      request_id: body.metadata.requestId,
      payment_method_id: body.payment_method,
    });
  }

  async chargePayment(body: any) {
    try {
      const findedPayment = await this.paymentRepository.findOne({
        where: { payment_intent_id: body.payment_intent },
      });
      findedPayment.card_brand = body.payment_method_details.card.brand;
      findedPayment.card_last = body.payment_method_details.card.last4;
      findedPayment.receipt_url = body.receipt_url;

      await findedPayment.save();
      console.log(findedPayment);
      const request = await this.userRequestService.getRequestById(
        findedPayment.request_id,
      );

      console.log(request);

      request.detail.status = 'paid';
      request.detail.save();
    } catch (error) {
      console.log(error.message);
    }
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
