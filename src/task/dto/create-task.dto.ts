import { IsEnum, IsNotEmpty, Length, Validate } from "class-validator";
import { TaskStatus } from "../task-status.enum";

export class CreateTaskDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    @Length(15,200)
    description:string;
    
    @IsNotEmpty()
    @IsEnum(TaskStatus)
    status: TaskStatus;
}
