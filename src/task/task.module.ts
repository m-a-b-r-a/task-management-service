import { Injectable, Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskRepository } from './task.repository';


@Module({
  imports:[TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskService,TaskRepository]
})
export class TaskModule {}
