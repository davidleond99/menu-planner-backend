/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { IngredientsService } from 'src/ingredients/ingredients.service';

@Injectable()
export class RecipeService {
  private readonly logger = new Logger('RecipeService');
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
    private readonly ingredientsService: IngredientsService,
  ) {}

  async create(createRecipeDto: CreateRecipeDto) {
    try {
      const recipe = this.recipeRepository.create(createRecipeDto);
      const ingredientsId = createRecipeDto.ingredientsId;
      const ingredient = await this.ingredientsService.findByIds(ingredientsId);
      recipe.ingredients = ingredient;
      await this.recipeRepository.save(recipe);

      return recipe;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll() {
    try {
      return this.recipeRepository.find({ relations: { ingredients: true } });
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findOneByName(name: string) {
    const recipe = await this.recipeRepository.findOneBy({
      name: name,
    });

    if (!recipe) throw new NotFoundException(`Recipe with ${name} not found`);

    return recipe;
  }

  async findOne(id: number) {
    const recipe = await this.recipeRepository.findOne({
      relations: { ingredients: true },
      where: { id: +id },
    });

    if (!recipe) throw new NotFoundException(`Recipe with ${id} not found`);

    return recipe;
  }

  async findByIds(ids: number[]) {
    const recipes = await this.recipeRepository.findBy({ id: In(ids) });

    if (!recipes.length) {
      throw new NotFoundException(`No recipes found for the provided IDs`);
    }

    return recipes;
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto) {
    const ingredientsId = updateRecipeDto.ingredientsId;
    const ingredients = await this.ingredientsService.findByIds(ingredientsId!);
    // recipe.ingredients = ingredient;
    const recipe = await this.recipeRepository.preload({
      id: +id,
      ...updateRecipeDto,
      ingredients: ingredients,
    });

    if (!recipe) throw new NotFoundException(`recipe with id: ${id} not found`);

    try {
      await this.recipeRepository.save(recipe);
      return recipe;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const recipe = await this.findOne(+id);
    await this.recipeRepository.remove(recipe);
  }

  private handleDBExceptions(error: any) {
    if (error.id === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
