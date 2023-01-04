import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './entites.service';
import { TasksConrtoller } from './entities.controller';
import { Task } from './entity.task';
@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksConrtoller],
  providers: [TasksService],
})
export class EntityModule {}
