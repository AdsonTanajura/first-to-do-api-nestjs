import { PartialType } from '@nestjs/mapped-types';
import { IsDate } from 'class-validator';
import { CreateToDoDto } from './create-to-do.dto';

export class UpdateToDoDto extends PartialType(CreateToDoDto) {}
