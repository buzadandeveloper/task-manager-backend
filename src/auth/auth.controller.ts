import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { GoogleAuthGuard } from './guard/google-auth.guard';
import { GithubAuthGuard } from './guard/github-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

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
    const redirectBase = user.redirect_uri || process.env.FRONTEND_URL;

    res.cookie('token', token.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.redirect(`${redirectBase}/dashboard`);
  }

  @UseGuards(GithubAuthGuard)
  @Get('github')
  async githubAuth(@Req() req) {}

  @UseGuards(GithubAuthGuard)
  @Get('github/callback')
  async githubAuthRedirect(@Req() req, @Res() res: Response) {
    const user = req.user;
    const token = await this.authService.createJwtToken(user);
    const redirectBase = user.redirect_uri || process.env.FRONTEND_URL;

    res.cookie('token', token.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.redirect(`${redirectBase}/dashboard`);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Req() req, @Res() res: Response) {
    const user = req.user;
    const redirectBase = user.redirect_uri || process.env.FRONTEND_URL;

    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });

    res.redirect(`${redirectBase}/login`);
  }
}
