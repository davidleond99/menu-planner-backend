/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import { Menu } from './entities/menu.entity';
import { RecipeService } from 'src/recipe/recipe.service';
import { IngredientsService } from 'src/ingredients/ingredients.service';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';

@Module({
  controllers: [MenuController],
  providers: [MenuService, RecipeService, IngredientsService],
  imports: [TypeOrmModule.forFeature([Menu, Recipe, Ingredient])],
})
export class MenuModule {}
