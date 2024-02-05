/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('recipe')
export class Recipe {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;
  @ApiProperty()
  @Column('text', { nullable: false, default: '' })
  name: string;
  @ApiProperty()
  @Column('text', { nullable: false, default: '' })
  instructions: string;

  // @ManyToMany(() => Ingredient, (ingredient) => ingredient.recipes)
  // @JoinTable({
  //   name: 'recipe_ingredients',
  //   joinColumn: {
  //     name: 'recipe_id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'ingredient_id',
  //   },
  // })
  // ingredients: Ingredient[];

}
