import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWindowDto, CreateWindowItemDto } from './dto/create-window.dto';
import { UpdateWindowDto } from './dto/update-window.dto';
import { InjectModel } from '@nestjs/sequelize';
import { WindowItem } from './entities/window-item.entity';
import { Window } from './entities/window.entity';

@Injectable()
export class WindowsService {
  constructor(
    @InjectModel(Window)
    private windowRepository: typeof Window,
    @InjectModel(WindowItem)
    private windowItemRepository: typeof WindowItem,
  ) {}

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
        include: [WindowItem],
      });
      return window;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  update(id: number, updateWindowDto: UpdateWindowDto) {
    return `This action updates a #${id} window`;
  }

  remove(id: number) {
    return `This action removes a #${id} window`;
  }
}
