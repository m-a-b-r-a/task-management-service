import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatus } from './dto/update-task-status.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Get()
  getAllTask(@Query() filter : GetTaskFilterDto) : Object {
    if(Object.keys(filter).length > 0){
      return this.taskService.getFiltered(filter);
    }
    return this.taskService.getAllTask();
  }

  @Post()
  createTask(@Body() createTaskDto:CreateTaskDto):Object{
    return this.taskService.createTask(createTaskDto);
  }
  @Get('/:id')
  getTaskById(@Param('id') id:string):Object{
    return this.taskService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id:string):Object{
    return this.taskService.deleteTask(id);
  }

  @Patch(':id')
  updateTask(@Param('id') id:string,@Body() data:UpdateTaskDto):Object{
    return this.taskService.updateTask(id,data);
  }

  @Get('/filter')
  getTaskFilter(@Query() filter:GetTaskFilterDto):Promise<Object>{
    if(Object.keys(filter).length){
      return this.taskService.getFiltered(filter);
    }else{
      return this.taskService.getAllTask();
    }
  }

}
