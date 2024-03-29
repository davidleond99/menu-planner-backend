/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Menu } from './entities/menu.entity';

@ApiTags('Menus')
@UseGuards(AuthGuard)
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Menu creado',
    type: Menu,
  })
  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Menu encontrado',
    type: Menu,
  })
  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @ApiResponse({
    status: 201,
    description: 'Menu encontrado',
    type: Menu,
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.menuService.findOne(id);
  }
  @Get('byUserId/:id')
  findByUserId(@Param('id') id: number) {
    return this.menuService.findByUserId(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Menu actualizado',
    type: Menu,
  })
  @Put(':id')
  update(@Param('id') id: number, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(id, updateMenuDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Menu eliminado',
    type: Menu,
  })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.menuService.remove(id);
  }
}
