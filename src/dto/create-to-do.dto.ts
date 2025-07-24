import { IsString, IsDate, IsNotEmpty } from 'class-validator';

export class CreateToDoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
