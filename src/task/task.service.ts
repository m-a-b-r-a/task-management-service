import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsUUID } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import {TaskStatus } from './task-status.enum';
import { TaskRepository } from './task.repository';
import {v4 as uuid} from 'uuid';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatus } from './dto/update-task-status.dto';

@Injectable()
export class TaskService {
  constructor(
    private taskRepo:TaskRepository
){}

async getAllTask():Promise<Object>{
  const data = await this.taskRepo.getAllTask();
  return data;
}

async createTask(createTaskDto:CreateTaskDto): Promise<Object>{
  const newTask = await this.taskRepo.createTask(createTaskDto);
  return newTask;
};

async getTaskById(id:string):Promise<Object>{
  return await this.taskRepo.getTask(id);
}

async deleteTask(id:string):Promise<Object>{
  return await this.taskRepo.deleteTask(id);
}

async updateTask(id:string,data:UpdateTaskDto):Promise<Object>{
  return await this.taskRepo.updateTask(id,data);
}
async getFiltered(filter:GetTaskFilterDto):Promise<Object>{
  return await this.taskRepo.getAllTaskQuery(filter);
}

}


