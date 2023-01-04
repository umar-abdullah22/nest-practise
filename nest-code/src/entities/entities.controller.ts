import { Body, Controller, Get, Post, Req } from '@nestjs/common/decorators';
import { Request } from 'express';
import { TaskDto } from './dto';
import { TasksService } from './entites.service';
import { Task } from './entity.task';

@Controller('tasks')
export class TasksConrtoller {
  constructor(private readonly taskservice: TasksService) {}
  @Get()
  async findAll(): Promise<Task[]> {
    return this.taskservice.findAll();
  }
  @Post('dummy')
  async insertDummy(): Promise<void> {
    return this.taskservice.insertDummyData();
  }
  @Post('add')
  async insert(@Req() dto: Request) {
    console.log(dto.body);
    return this.taskservice.insert(dto);
  }
}
