import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateToDoDto } from 'src/dto/create-to-do.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post('create')
  createList(@Body() createToDoDto: CreateToDoDto, @Request() req) {
    return this.listService.createList(createToDoDto, req.user.userId);
  }

  @Put(':id')
  updateList(
    @Param('id') id: string,
    @Body() { title, description }: CreateToDoDto
  ) {
    return this.listService.updateList(id, title, description);
  }

  @Delete(':id')
  deleteList(@Param('id') id: string) {
    return this.listService.deleteList(id);
  }

  @Get('all')
  getAllListsByUser(@Request() req) {
    return this.listService.getAllListsByUser(req.user.userId);
  }

  @Get(':id')
  getListById(@Param('id') id: string) {
    return this.listService.getListById(id);
  }

  @Get('search/:term')
  searchByTitle(@Param('term') term: string, @Request() req) {
    return this.listService.searchByTitle(term, req.user.userId);
  }
}
