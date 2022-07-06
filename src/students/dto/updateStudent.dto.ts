import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateStudentDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsString()
  classroom: string;

  @IsNotEmpty()
  avatar: string;
}
