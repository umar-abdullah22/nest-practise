import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { TaskDto } from './dto';
import { Task } from './entity.task';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  async insertDummyData(): Promise<void> {
    const tasks: Task[] = [
      {
        id: 1,
        title: 'Task 1',
        description: 'Description 1',
      },
      {
        id: 2,
        title: 'Task 2',
        description: 'Description 2',
      },
      {
        id: 3,
        title: 'Task 3',
        description: 'Description 3',
      },
    ];
    await this.tasksRepository.insert(tasks);
  }
  async insert(dto: Request): Promise<{ data: string }> {
    const { id, title, description } = dto.body;
    const user = await this.tasksRepository.save({
      id,
      title,
      description,
    });
    return {
      data: `Data added : Id-> ${user.id}    Title-> ${user.title}    Description-> ${user.description}`,
    };
  }
}
