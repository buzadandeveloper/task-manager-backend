import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github';
import { AuthService } from '../auth.service';
import * as process from 'node:process';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private authService: AuthService) {
    super({
      clientID: `${process.env.GITHUB_CLIENT_ID}`,
      clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
      callbackURL: `${process.env.BASE_URL}/auth/github/callback`,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const user = await this.authService.findOrCreateUser({
      email: profile.emails[0].value,
      name: profile.displayName || profile.emails[0].value.split('@')[0],
    });
    return user;
  }
}
