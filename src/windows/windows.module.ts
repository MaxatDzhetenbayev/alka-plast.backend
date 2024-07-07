import { Module } from '@nestjs/common';
import { WindowsService } from './windows.service';
import { WindowsController } from './windows.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Window } from './entities/window.entity';
import { WindowItem } from './entities/window-item.entity';
import { WindowItemFeature } from './entities/window-item-feature.entity';

@Module({
  controllers: [WindowsController],
  imports: [
    SequelizeModule.forFeature([Window, WindowItem, WindowItemFeature]),
  ],
  providers: [WindowsService],
  exports: [WindowsService],
})
export class WindowsModule {}
