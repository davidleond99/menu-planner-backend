/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Ingredient } from './entities/ingredient.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class IngredientsService {
  private readonly logger = new Logger('IngredientService');
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async create(createIngredientDto: CreateIngredientDto) {
    try {
      const ingredient = this.ingredientRepository.create(createIngredientDto);
      await this.ingredientRepository.save(ingredient);

      return ingredient;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll() {
    try {
      return this.ingredientRepository.find();
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findOne(id: number) {
    const ingredient = await this.ingredientRepository.findOneBy({
      id: +id,
    });

    if (!ingredient)
      throw new NotFoundException(`Ingredient with ${id} not found`);

    return ingredient;
  }

  async findByIds(ids: number[]) {
    const ingredients: Ingredient[] = [];
    ids.map(async (id) => {
      const ingr = await this.findOne(id);
      ingredients.push(ingr);
    });

    if (!ingredients.length) {
      throw new NotFoundException(`No ingredients found for the provided IDs`);
    }

    return ingredients;
  }

  async update(id: number, updateIngredientDto: UpdateIngredientDto) {
    const ingredient = await this.ingredientRepository.preload({
      id: +id,
      ...updateIngredientDto,
    });

    if (!ingredient)
      throw new NotFoundException(`Ingredient with id: ${id} not found`);

    try {
      await this.ingredientRepository.save(ingredient);
      return ingredient;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const ingredient = await this.findOne(id);
    await this.ingredientRepository.remove(ingredient);
  }

  private handleDBExceptions(error: any) {
    if (error.id === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
