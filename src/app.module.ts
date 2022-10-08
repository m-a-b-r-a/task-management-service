import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import "dotenv/config"
import { TaskRepository } from './task/task.repository';

@Module({
  imports: [TypeOrmModule.forRoot({
  type: 'postgres', 
  port:5554,
  host: 'localhost', 
  username:'postgres', 
  password:'123123qwer', 
  database:'task_management',
  autoLoadEntities: true,
  synchronize: true,
  logging: false, //supaya perubahan data terlihat dalam log
  dropSchema: true,
  }), TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
