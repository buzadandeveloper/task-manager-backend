import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('task-manager')
  getLoginPage(): void {}

  @Get('dashboard')
  getDashboard(@Query('token') token: string): void {}
}
