import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  CreateWindowDto,
  CreateWindowItemDto,
  CreateWindowItemFeatureDto,
} from './dto/create-window.dto';
import { UpdateWindowDto } from './dto/update-window.dto';
import { InjectModel } from '@nestjs/sequelize';
import { WindowItem } from './entities/window-item.entity';
import { Window } from './entities/window.entity';
import { WindowItemFeature } from './entities/window-item-feature.entity';

@Injectable()
export class WindowsService {
  constructor(
    @InjectModel(Window)
    private windowRepository: typeof Window,
    @InjectModel(WindowItem)
    private windowItemRepository: typeof WindowItem,
    @InjectModel(WindowItemFeature)
    private windowItemFeatureRepository: typeof WindowItemFeature,
  ) { }

  async create(createWindowDto: CreateWindowDto) {
    try {
      const window = await this.windowRepository.create(createWindowDto);
      return window;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async createWindowItem(
    windowId: number,
    createWindowItem: CreateWindowItemDto,
  ) {
    const window = await this.windowRepository.findByPk(windowId);

    if (!window) {
      throw new HttpException('Window not found', HttpStatus.NOT_FOUND);
    }

    try {
      const windowItem = await this.windowItemRepository.create({
        window_id: windowId,
        ...createWindowItem,
      });
      return windowItem;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findWindowItemFeatures(windowItemId: number) {
    const windowItem = await this.windowItemRepository.findByPk(windowItemId, {
      include: [WindowItemFeature],
    });

    if (!windowItem) {
      throw new HttpException('Window item not found', HttpStatus.NOT_FOUND);
    }

    return windowItem.features;
  }

  async createWindowItemFeature(
    windowItemId: number,
    createWindowItemDto: CreateWindowItemFeatureDto,
  ) {
    const windowItem = await this.windowItemRepository.findByPk(windowItemId);

    if (!windowItem) {
      throw new HttpException('Window item not found', HttpStatus.NOT_FOUND);
    }

    try {
      const windowItemFeature = await this.windowItemFeatureRepository.create({
        item_id: windowItemId,
        ...createWindowItemDto,
      });

      return windowItemFeature;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const window = await this.windowRepository.findAll({
        include: [WindowItem],
      });
      return window;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number) {
    try {
      const window = await this.windowRepository.findByPk(id, {
        include: [
          {
            model: WindowItem,
            include: [WindowItemFeature],
          },
        ],
      });
      return window;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findWindowItems(windowId: number) {
    const window = await this.windowRepository.findByPk(windowId, {
      include: [WindowItem],
    });

    if (!window) {
      throw new HttpException('Window not found', HttpStatus.NOT_FOUND);
    }

    return window.items;
  }

  async update(id: number, updateWindowDto: UpdateWindowDto) {
    try {
      const window = await this.windowRepository.findByPk(id);

      if (!window) {
        throw new InternalServerErrorException('Window not found');
      }

      return await window.update(updateWindowDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} window`;
  }
}
