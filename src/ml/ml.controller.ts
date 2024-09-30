import { Controller, Post, Body } from '@nestjs/common';
import { MlService } from './ml.service';

@Controller('ml')
export class MlController {
  constructor(private readonly mlService: MlService) {}
  // API для тренировки модели
  @Post('train')
  async trainModel(@Body() data: any[]) {
    await this.mlService.trainModels(data);
    return { message: 'Model trained successfully' };
  }

  // API для предсказания времени замера и монтажа
  @Post('predict')
  async predict(
    @Body()
    data: any,
  ) {
    const result = this.mlService.predictTimes(data);
    return result;
  }
}
