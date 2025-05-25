import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { GoogleAuthGuard } from './guard/google-auth.guard';
import { GithubAuthGuard } from './guard/github-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  async googleAuth(@Req() req, @Res() res: Response) {
    const redirect_uri = req.query.redirect_uri || process.env.FRONTEND_URL;
    const baseUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID || '',
      redirect_uri: `${process.env.BACKEND_URL || ''}/auth/google/callback`,
      response_type: 'code',
      scope: 'email profile',
      state: redirect_uri,
      access_type: 'offline',
      prompt: 'consent',
    });

    const redirectUrl = `${baseUrl}?${params.toString()}`;
    res.redirect(redirectUrl);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const user = req.user;
    const token = await this.authService.createJwtToken(user);
    const redirectBase = user.redirect_uri || process.env.FRONTEND_URL;

    res.cookie('token', token.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.redirect(`${redirectBase}/dashboard`);
  }

  @Get('github')
  async githubAuth(@Req() req, @Res() res: Response) {
    const redirect_uri = req.query.redirect_uri || process.env.FRONTEND_URL;
    const baseUrl = 'https://github.com/login/oauth/authorize';
    const params = new URLSearchParams({
      client_id: process.env.GITHUB_CLIENT_ID || '',
      redirect_uri: `${process.env.BACKEND_URL || ''}/auth/github/callback`,
      scope: 'user:email',
      state: redirect_uri,
    });

    const redirectUrl = `${baseUrl}?${params.toString()}`;
    res.redirect(redirectUrl);
  }

  @UseGuards(GithubAuthGuard)
  @Get('github/callback')
  async githubAuthRedirect(@Req() req, @Res() res: Response) {
    const user = req.user;
    const token = await this.authService.createJwtToken(user);
    const redirectBase = user.redirect_uri || process.env.FRONTEND_URL;

    res.cookie('token', token.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
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
    const redirectBase = req.query.redirect_uri || process.env.FRONTEND_URL;

    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    res.redirect(`${redirectBase}/login`);
  }
}
