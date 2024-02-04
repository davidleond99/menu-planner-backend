/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { Recipe } from './entities/recipe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import { IngredientsService } from 'src/ingredients/ingredients.service';

@Module({
  controllers: [RecipeController],
  providers: [RecipeService, IngredientsService],
  imports: [TypeOrmModule.forFeature([Recipe, Ingredient])],

})
export class RecipeModule {}
