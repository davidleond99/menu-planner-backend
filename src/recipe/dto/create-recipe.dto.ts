/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

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
  @ApiProperty({
    required: true,
    nullable: false,
    name: 'ingredientsId',
  })
  ingredientsId: number[];
}
