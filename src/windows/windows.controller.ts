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
} from '@nestjs/common';
import { WindowsService } from './windows.service';
import { CreateWindowDto, CreateWindowItemDto } from './dto/create-window.dto';
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
  @Roles(Role.Admin, Role.User)
  @Get()
  findAll() {
    return this.windowsService.findAll();
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.windowsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWindowDto: UpdateWindowDto) {
    return this.windowsService.update(+id, updateWindowDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.windowsService.remove(+id);
  }
}
