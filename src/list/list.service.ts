import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateToDoDto } from 'src/dto/create-to-do.dto';
import { List } from 'src/entities/list.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List) private listRepository: Repository<List>
  ) {}

  async createList({ title, description }: CreateToDoDto): Promise<List> {
    const id = crypto.randomUUID();
    const fortId = 'todo-' + id;
    const newList = this.listRepository.create({
      title,
      description,
      id: fortId,
    });
    return this.listRepository.save(newList);
  }

  async getAllLists(): Promise<List[]> {
    return this.listRepository.find();
  }

  async getListById(id: string): Promise<List> {
    try {
      return await this.listRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`List with ID ${id} not found`);
    }
  }

  async searchByTitle(term: string): Promise<List[]> {
    if (!term) {
      return this.getAllLists();
    }
    return this.listRepository.find({
      where: { title: Like(`%${term}%`) },
    });
  }

  async deleteList(id: string): Promise<void> {
    const result = await this.listRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`List with ID ${id} not found`);
    }
  }

  async updateList(
    id: string,
    title: string,
    description: string
  ): Promise<List> {
    const list = await this.getListById(id);
    list.title = title;
    list.description = description;
    return this.listRepository.save(list);
  }
}
