/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  @ApiProperty({
    required: true,
    nullable: false,
    name: 'name',
  })
  name: string;
  
  @IsString()
  @ApiProperty({
    required: true,
    nullable: false,
    name: 'instructions',
  })
  instructions: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @ApiProperty({
    type: [Number], // Especifica que es una lista de números
    required: true,
    nullable: false,
    name: 'ingredientsId',
  })
  ingredientsId: number[];
}
