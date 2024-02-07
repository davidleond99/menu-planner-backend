/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsNumber } from 'class-validator';

export class CreateMenuDto {
  @IsNumber()
  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
    name: 'userId',
  })
  userId: number;

  @IsString()
  @ApiProperty({
    required: true,
    nullable: false,
    name: 'name',
  })
  name: string;

  @IsString()
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    name: 'dateStart',
  })
  dateStart: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @ApiProperty({
    type: [Number],
    required: true,
    nullable: false,
    name: 'recipesId',
  })
  recipesId: number[];
}
