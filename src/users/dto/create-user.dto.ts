import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Is } from 'sequelize-typescript';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsString({ each: true })
  roles?: string[];
}
