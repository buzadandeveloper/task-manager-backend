import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { GoogleAuthGuard } from './guard/google-auth.guard';
import { GithubAuthGuard } from './guard/github-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GoogleAuthGuard)
  @Get('google')
  async googleAuth(@Req() req) {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const user = req.user;
    const token = await this.authService.createJwtToken(user);
    res.redirect(
      `${process.env.FRONTEND_URL}/dashboard?token=${token.access_token}`,
    );
  }

  @UseGuards(GithubAuthGuard)
  @Get('github')
  async githubAuth(@Req() req) {}

  @UseGuards(GithubAuthGuard)
  @Get('github/callback')
  async githubAuthRedirect(@Req() req, @Res() res: Response) {
    const user = req.user;
    const token = await this.authService.createJwtToken(user);
    res.redirect(
      `${process.env.FRONTEND_URL}/dashboard?token=${token.access_token}`,
    );
  }
}
