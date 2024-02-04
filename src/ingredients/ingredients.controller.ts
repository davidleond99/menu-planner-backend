/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseArrayPipe,
  Query,
} from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Ingredient } from './entities/ingredient.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@ApiTags('Ingredients')
@UseGuards(AuthGuard)
@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Participante creado',
    type: Ingredient,
  })
  create(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientsService.create(createIngredientDto);
  }

  @Get()
  @ApiResponse({
    status: 201,
    description: 'Participante creado',
    type: Ingredient,
  })
  findAll() {
    return this.ingredientsService.findAll();
  }

  @Get(':code')
  @ApiResponse({
    status: 201,
    description: 'Participante creado',
    type: Ingredient,
  })
  findOne(@Param('code') code: string) {
    return this.ingredientsService.findOne(+code);
  }



  @Get('/findByIds')
  @ApiResponse({
    status: 201,
    description: 'Ingredientes por Ids',
    type: Ingredient,
  })
  findByIds(
    @Query('ids', new ParseArrayPipe({ items: Number, separator: ',' }))
    ids: number[],
  ) {
    return this.ingredientsService.findByIds(ids);
  }
  
  @Patch(':code')
  @ApiResponse({
    status: 201,
    description: 'Participante creado',
    type: Ingredient,
  })
  update(
    @Param('code') code: string,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ) {
    return this.ingredientsService.update(+code, updateIngredientDto);
  }

  @Delete(':code')
  @ApiResponse({
    status: 201,
    description: 'Participante creado',
    type: Ingredient,
  })
  remove(@Param('code') code: string) {
    return this.ingredientsService.remove(+code);
  }
}
