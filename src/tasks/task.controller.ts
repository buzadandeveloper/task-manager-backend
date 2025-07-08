import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskStatus } from './enum/task.enum';

@ApiTags('tasks')
@Controller('api/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all tasks (optionally filtered by status)' })
  @ApiResponse({
    status: 200,
    description:
      'Return all tasks of the logged-in user, optionally filtered by status',
    type: [TaskResponseDto],
  })
  async getAllTasks(@Req() req: Request, @Query('status') status?: TaskStatus) {
    const user = (req as any).user;
    const userId = user.sub;
    if (status === undefined || status === TaskStatus.All) {
      return this.taskService.getAllTasks(userId);
    }
    return this.taskService.getTasksByStatus(Number(status), userId);
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

  @Get('filter/:status')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get tasks by status' })
  @ApiResponse({
    status: 200,
    description: 'Return tasks by status for the logged-in user',
    type: [TaskResponseDto],
  })
  async getTasksByStatus(
    @Param('status') status: TaskStatus,
    @Req() req: Request,
  ) {
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

  @Put('updateStatus/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update task status' })
  @ApiResponse({
    status: 200,
    description: 'The task status has been successfully updated.',
    type: TaskResponseDto,
  })
  async updateTaskStatus(
    @Param('id') id: number,
    @Body() updateStatusDto: UpdateStatusDto,
    @Req() req: Request,
  ) {
    const user = (req as any).user;
    const userId = user.sub;
    return this.taskService.updateTaskStatus(id, updateStatusDto, userId);
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
