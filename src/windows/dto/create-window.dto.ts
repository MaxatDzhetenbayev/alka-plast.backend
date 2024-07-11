import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class CreateWindowDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  description: string;
}

export class CreateWindowItemDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  price: number;
  @IsNotEmpty()
  @IsString()
  image: string;
  @IsNotEmpty()
  @IsObject()
  characteristics: Object;
}

export class CreateWindowItemFeatureDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  description: string;
}
