/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
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
    description: 'Participante creado',
    type: Recipe,
  })
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.create(createRecipeDto);
  }

  @Get()
  @ApiResponse({
    status: 201,
    description: 'Recipe creado',
    type: Recipe,
  })
  findAll() {
    return this.recipeService.findAll();
  }

  @Get(':name')
  @ApiResponse({
    status: 201,
    description: 'Participante creado',
    type: Recipe,
  })
  findOne(@Param('name') name: string) {
    return this.recipeService.findOne(name);
  }

  @Patch(':id')
  @ApiResponse({
    status: 201,
    description: 'Receta actualizada',
    type: Recipe,
  })
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipeService.update(+id, updateRecipeDto);
  }

  @Delete(':name')
  @ApiResponse({
    status: 201,
    description: 'Receta eliminada',
    type: Recipe,
  })
  remove(@Param('name') name: string) {
    return this.recipeService.remove(name);
  }
}
