import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  UploadedFile,
  UseGuards,
  Put,
} from '@nestjs/common';
import { WindowsService } from './windows.service';
import {
  CreateWindowDto,
  CreateWindowItemDto,
  CreateWindowItemFeatureDto,
} from './dto/create-window.dto';
import { UpdateWindowDto } from './dto/update-window.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('windows')
export class WindowsController {
  constructor(private readonly windowsService: WindowsService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createWindowDto: CreateWindowDto) {
    return this.windowsService.create(createWindowDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Post(':id/items')
  async createWindowItem(
    @Param('id', ParseIntPipe) windowId: number,
    @Body() createWindowItemDto: CreateWindowItemDto,
  ) {
    return this.windowsService.createWindowItem(windowId, createWindowItemDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Post(':id/features')
  async createWindowItemFeature(
    @Param('id', ParseIntPipe) windowItemId: number,
    @Body() createWindowItemFeatureDto: CreateWindowItemFeatureDto,
  ) {
    return this.windowsService.createWindowItemFeature(
      windowItemId,
      createWindowItemFeatureDto,
    );
  }

  @Get(':id/items')
  async findWindowItems(@Param('id', ParseIntPipe) windowId: number) {
    return this.windowsService.findWindowItems(windowId);
  }

  @Get(':id/features')
  async findWindowItemsFeatures(@Param('id', ParseIntPipe) itemId: number) {
    return this.windowsService.findWindowItemFeatures(itemId);
  }

  // @UseGuards(RolesGuard)
  // @Roles(Role.Admin)
  @Put(':id/items')
  async updateWindowItem(
    @Param('id') id: number,
    @Body() updateData: any, // Данные для обновления WindowItem и связанных features
  ) {
    console.log(updateData);
    const { features, ...data } = updateData;
    return this.windowsService.updateWindowItemAndFeatures(id, data, features);
  }

  @Get()
  findAll() {
    return this.windowsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.windowsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWindowDto: UpdateWindowDto) {
    console.log('window id', id);
    console.log('data', updateWindowDto);
    return this.windowsService.update(+id, updateWindowDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.windowsService.remove(+id);
  }
}
