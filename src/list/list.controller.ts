import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateToDoDto } from 'src/dto/create-to-do.dto';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post('create')
  createList(@Body() { title, description }: CreateToDoDto) {
    return this.listService.createList({ title, description });
  }

  @Put(':id')
  updateList(id: string, @Body() { title, description }: CreateToDoDto) {
    return this.listService.updateList(id, title, description);
  }

  @Delete(':id')
  deleteList(id: string) {
    return this.listService.deleteList(id);
  }

  @Get('all')
  getAllLists() {
    return this.listService.getAllLists();
  }
  @Get(':id')
  getListById(id: string) {
    return this.listService.getListById(id);
  }

  @Get('search/:term')
  searchByTitle(@Param('term') term: string) {
    return this.listService.searchByTitle(term);
  }
}
