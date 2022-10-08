import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { DataSource, EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
import { UpdateTaskStatus } from "./dto/update-task-status.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./entities/task.entity";
import { TaskStatus } from "./task-status.enum";

//Promise = Future, dia di running ketika sudah berhasil.

@Injectable()
export class TaskRepository extends Repository<Task>{

    constructor(private dataSource: DataSource)
    {
        super(Task, dataSource.createEntityManager());
    }
    
    async createTask(createTaskDto:CreateTaskDto):Promise<Task>{
        const {title,description,status} = createTaskDto;
        try {
            const task = await this.create({
                title:title,
                description:description,
                status:status
            })
            await this.save(task);
            return task;
        } catch (error) {
            if(error.code == 23505){
                throw new ConflictException(`Title ${title} already exists`);
            }else{
                throw new InternalServerErrorException()
            }
        }
    }
    async getAllTaskQuery(filter:GetTaskFilterDto):Promise<Object>{
        const {status,search} = filter;
        const query = this.createQueryBuilder('task');
        if(status){
            query.andWhere('task.status = :status',{status});
        }
        if(search){
            query.andWhere('LOWER(task.title) LIKE LOWER(:search) or LOWER(task.description) LIKE LOWER(:search)'
            ,{search:`%${search}%`});
           
        }
        const task = await query.getMany();
        return {
            status:200,
            message:"OK",
            data:task,
        };
    }
    async getAllTask():Promise<Object>{
        const data = await this.find();
        return {
            status:200,
            message:"OK",
            data:data
        }
    }

    async getTaskFIlter(filter:GetTaskFilterDto):Promise<Object>{
        const {status,search} = filter;
        const data = this.find({where:[
            {title:search,status:status},
            {description:search,status:status}
        ]});
        return {
            status:200,
            message:"OK",
            data:data
        }
    }
    async getTask(id:string):Promise<Object>{
        const data = await this.findOne({where:{id}});
        if(!data){
            throw new NotFoundException('Task Tidak Ditemukan');
        }
        console.log(data);    
        return data;
    }
    async updateTask(id:string,dataUpdate:UpdateTaskDto):Promise<Object>{
        await this.getTask(id);
        await this.update(id,dataUpdate);
        return{
            success:200,
            message:"OK"
        }
    }
    async deleteTask(id:string):Promise<Object>{
        const data = await this.getTask(id);
        await this.delete(id);
        return{
            status:200,
            message:"Data Deleted"
        }
    }
}