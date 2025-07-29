import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateToDoDto } from 'src/dto/create-to-do.dto';
import { List } from 'src/list/entity/list.entity';
import { User } from 'src/user/entity/user.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List) private listRepository: Repository<List>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async createList(
    { title, description }: CreateToDoDto,
    userId: string
  ): Promise<List> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const listId = crypto.randomUUID();
    const formtListId = 'todo-' + listId;
    const newList = this.listRepository.create({
      title,
      description,
      id: formtListId,
      user: user,
    });

    return this.listRepository.save(newList);
  }

  async getAllListsByUser(userId: string): Promise<List[]> {
    return this.listRepository.find({ where: { user: { id: userId } } });
  }

  async getListById(id: string): Promise<List> {
    try {
      return await this.listRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`List with ID ${id} not found`);
    }
  }

  async searchByTitle(term: string, id: string): Promise<List[]> {
    if (!term) {
      return this.getAllListsByUser(id);
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
