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
import { Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';

@Injectable()
export class RecipeService {
  private readonly logger = new Logger('Recipeervice');
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
    // private readonly ingredientsService: IngredientsService,
  ) {}

  async create(createRecipeDto: CreateRecipeDto) {
    try {
      const recipe = this.recipeRepository.create(createRecipeDto);
      // const ingredientsId = createRecipeDto.ingredientsId;
      // const ingredient = await this.ingredientsService.findByIds(ingredientsId);
      // recipe.ingredients = ingredient;
      await this.recipeRepository.save(recipe);

      return recipe;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll() {
    try {
      return this.recipeRepository.find();
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findOne(name: string) {
    const recipe = await this.recipeRepository.findOneBy({
      name: name,
    });

    if (!recipe) throw new NotFoundException(`Recipe with ${name} not found`);

    return recipe;
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto) {
    const recipe = await this.recipeRepository.preload({
      id: +id,
      ...updateRecipeDto,
    });

    if (!recipe) throw new NotFoundException(`recipe with id: ${id} not found`);

    try {
      await this.recipeRepository.save(recipe);
      return recipe;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(name: string) {
    const recipe = await this.findOne(name);
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
