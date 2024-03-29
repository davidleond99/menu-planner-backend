/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Recipe } from './entities/recipe.entity';

@ApiTags('Recipes')
@UseGuards(AuthGuard)
@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Receta creada',
    type: Recipe,
  })
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.create(createRecipeDto);
  }

  @Get()
  @ApiResponse({
    status: 201,
    description: 'Receta creada',
    type: Recipe,
  })
  findAll() {
    return this.recipeService.findAll();
  }

  @Get('findOneByName/:name')
  @ApiResponse({
    status: 201,
    description: 'Receta encontrada',
    type: Recipe,
  })
  findOneByName(@Param('name') name: string) {
    return this.recipeService.findOneByName(name);
  }
  @Get(':code')
  @ApiResponse({
    status: 201,
    description: 'Receta encontrada',
    type: Recipe,
  })
  findOne(@Param('code') code: number) {
    return this.recipeService.findOne(+code);
  }

  @Put(':id')
  @ApiResponse({
    status: 201,
    description: 'Receta actualizada',
    type: Recipe,
  })
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipeService.update(+id, updateRecipeDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 201,
    description: 'Receta eliminada',
    type: Recipe,
  })
  remove(@Param('id') id: number) {
    console.log(id)
    return this.recipeService.remove(+id);
  }
}
