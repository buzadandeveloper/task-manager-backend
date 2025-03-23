import {
  Controller,
  Req,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('api/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({
    status: 200,
    description: 'Return all tasks of the logged-in user',
    type: [TaskResponseDto],
  })
  async getAllTasks(@Req() req: Request) {
    const user = (req as any).user;
    const userId = user.sub;
    return this.taskService.getAllTasks(userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get task by id' })
  @ApiResponse({
    status: 200,
    description: 'Return task by id for the logged-in user',
    type: TaskResponseDto,
  })
  async getTaskById(@Param('id') id: number, @Req() req: Request) {
    const user = (req as any).user;
    const userId = user.sub;
    return this.taskService.getTaskById(id, userId);
  }

  @Get('filter/status')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get tasks by status' })
  @ApiResponse({
    status: 200,
    description: 'Return tasks by status for the logged-in user',
    type: [TaskResponseDto],
  })
  async getTasksByStatus(@Query('status') status: number, @Req() req: Request) {
    const user = (req as any).user;
    const userId = user.sub;
    return this.taskService.getTasksByStatus(status, userId);
  }

  @Post('newTask')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a task' })
  @ApiResponse({
    status: 201,
    description: 'The task has been successfully created.',
    type: TaskResponseDto,
  })
  async createTask(@Body() createTaskDto: CreateTaskDto, @Req() req: Request) {
    const user = (req as any).user;
    const userId = user.sub;
    return this.taskService.createTask(createTaskDto, userId);
  }

  @Put('updateTask/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully updated.',
    type: TaskResponseDto,
  })
  async updateTask(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req: Request,
  ) {
    const user = (req as any).user;
    const userId = user.sub;
    return this.taskService.updateTask(id, updateTaskDto, userId);
  }

  @Delete('removeTask/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully deleted.',
    type: TaskResponseDto,
  })
  async deleteTask(@Param('id') id: number, @Req() req: Request) {
    const user = (req as any).user;
    const userId = user.sub;
    return this.taskService.deleteTask(id, userId);
  }
}
