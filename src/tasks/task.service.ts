import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async createTask(createTaskDto: CreateTaskDto, userId: number) {
    const { title, description, date } = createTaskDto;

    return this.prisma.task.create({
      data: {
        title,
        description,
        status: 0,
        date: date ? new Date(date) : new Date(),
        user: { connect: { id: userId } },
      },
    });
  }

  async getAllTasks(userId: number) {
    return this.prisma.task.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async getTasksByStatus(status: number, userId: number) {
    return this.prisma.task.findMany({
      where: {
        status,
        userId: userId,
      },
    });
  }

  async getTaskById(id: number, userId: number) {
    return this.prisma.task.findUnique({
      where: {
        id,
        userId: userId,
      },
    });
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto, userId: number) {
    return this.prisma.task.update({
      where: {
        id,
        userId: userId,
      },
      data: updateTaskDto,
    });
  }

  async deleteTask(id: number, userId: number) {
    return this.prisma.task.delete({
      where: {
        id,
        userId: userId,
      },
    });
  }
}
