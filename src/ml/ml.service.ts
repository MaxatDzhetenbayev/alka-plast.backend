import { Injectable } from '@nestjs/common';
import {
  LayersModel,
  loadLayersModel,
  sequential,
  Sequential,
  layers,
  tensor2d,
  Tensor,
} from '@tensorflow/tfjs-node';
import { join } from 'path';
import * as fs from 'fs';

function toFileUrl(filePath: string): string {
  const path = require('path');
  return `file://${path.resolve(filePath).replace(/\\/g, '/')}`;
}

@Injectable()
export class MlService {
  private measurementModel: LayersModel;
  private installationModel: LayersModel;

  constructor() {
    const modelPath = join(__dirname, '..', '..', 'ml_models');

    if (!fs.existsSync(modelPath)) {
      fs.mkdirSync(modelPath, { recursive: true });
    }

    if (
      fs.existsSync(join(modelPath, 'measurementModel', 'model.json')) &&
      fs.existsSync(join(modelPath, 'installationModel', 'model.json'))
    ) {
      this.loadModels();
    } else {
      this.createModels();
    }
  }

  // Сохранение модели на диск
  async saveModel() {
    const modelPath = join(__dirname, '..', '..', 'ml_models');
    await this.measurementModel.save(
      toFileUrl(join(modelPath, 'measurementModel')),
    );
    await this.installationModel.save(
      toFileUrl(join(modelPath, 'installationModel')),
    );
  }

  async loadModels() {
    const modelPath = join(__dirname, '..', '..', 'ml_models');
    this.measurementModel = await loadLayersModel(
      toFileUrl(join(modelPath, 'measurementModel', 'model.json')),
    );
    this.installationModel = await loadLayersModel(
      toFileUrl(join(modelPath, 'installationModel', 'model.json')),
    );

    // Убедитесь, что модели компилируются перед использованием
    (this.measurementModel as Sequential).compile({
      optimizer: 'sgd',
      loss: 'meanSquaredError',
    });
    (this.installationModel as Sequential).compile({
      optimizer: 'sgd',
      loss: 'meanSquaredError',
    });

    console.log('Models loaded and compiled.');
  }

  // Создание моделей (если они не существуют)
  createModels() {
    this.measurementModel = sequential();
    this.installationModel = sequential();

    [this.measurementModel, this.installationModel].forEach((model) => {
      (model as Sequential).add(
        layers.dense({ inputShape: [5], units: 1, activation: 'linear' }),
      );
      (model as Sequential).compile({
        optimizer: 'sgd',
        loss: 'meanSquaredError',
      });
    });
  }

  // Обучение модели и её сохранение с нормализацией данных
  async trainModels(data: any[]): Promise<void> {
    // Нормализация: каждое значение делим на максимум (в данном случае это 5)
    const maxValue = 5; // Поскольку максимальные значения ваших данных не превышают 5

    const inputs = data.map((d) => [
      this.calculateDaysDifference(d.requestDate, d.actualMeasurementDate) /
        maxValue, // Нормализованная разница в днях для замера
      this.calculateDaysDifference(
        d.plannedInstallationDate,
        d.actualInstallationDate,
      ) / maxValue, // Нормализованная разница для монтажа
      ...this.encodeWindowModel(d.windowModel), // One-Hot Encoding для модели окна (эти значения уже 0 или 1, поэтому их не нужно нормализовать)
    ]);

    const measurementDurations = data.map(
      (d) =>
        this.calculateDaysDifference(d.requestDate, d.actualMeasurementDate) /
        maxValue, // Нормализуем также target для замеров
    );
    const installationDurations = data.map(
      (d) =>
        this.calculateDaysDifference(
          d.plannedInstallationDate,
          d.actualInstallationDate,
        ) / maxValue, // Нормализуем также target для установок
    );

    // Преобразование данных в тензоры
    const xs = tensor2d(inputs, [inputs.length, 5]); // Входные данные с нормализованными значениями
    const ysMeasurement = tensor2d(measurementDurations, [
      measurementDurations.length,
      1,
    ]);
    const ysInstallation = tensor2d(installationDurations, [
      installationDurations.length,
      1,
    ]);

    // Обучение модели
    await (this.measurementModel as Sequential).fit(xs, ysMeasurement, {
      epochs: 100,
    });
    await (this.installationModel as Sequential).fit(xs, ysInstallation, {
      epochs: 100,
    });

    // Сохранение модели после обучения
    await this.saveModel();
  }

  predictTimes(data: {
    requestDate: string;
    plannedMeasurementDate: string;
    plannedInstallationDate: string;
    windowModel: string;
  }) {
    const input = [
      this.calculateDaysDifference(
        data.requestDate,
        data.plannedMeasurementDate,
      ), // Разница между заявкой и замером
      this.calculateDaysDifference(
        data.requestDate,
        data.plannedInstallationDate,
      ), // Разница между заявкой и планом монтажа
      ...this.encodeWindowModel(data.windowModel), // One-Hot Encoding для модели окна
    ];

    const inputTensor = tensor2d([input], [1, 5]);

    // Предсказания для времени монтажа
    const predictedInstallation = this.installationModel.predict(
      inputTensor,
    ) as Tensor;
    const installationArray = predictedInstallation.dataSync();

    const installationTime =
      installationArray.length > 0 ? installationArray[0] : null;

    // Преобразуем количество дней в дату
    const plannedInstallationDate = new Date(data.plannedInstallationDate);

    // Рассчитываем ожидаемую дату фактического монтажа
    const estimatedInstallationDate = new Date(plannedInstallationDate);
    estimatedInstallationDate.setDate(
      plannedInstallationDate.getDate() + Math.round(installationTime),
    );

    return {
      estimatedInstallationDate: estimatedInstallationDate
        .toISOString()
        .split('T')[0], // Форматируем дату как YYYY-MM-DD
    };
  }

  // Вспомогательные методы
  private calculateDaysDifference(date1: string, date2: string): number {
    const diff =
      (new Date(date2).getTime() - new Date(date1).getTime()) /
      (1000 * 3600 * 24);
    return diff;
  }

  private encodeWindowModel(model: string): number[] {
    const models = ['model1', 'model2', 'model3'];
    return models.map((m) => (m === model ? 1 : 0));
  }
}
