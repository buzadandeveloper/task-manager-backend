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
      callbackURL: `${process.env.BACKEND_URL}/auth/github/callback`,
      passReqToCallback: true,
      scope: ['user:email'],
    });
  }

  async validate(
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
  ) {
    let email = profile.emails?.[0]?.value;

    if (!email) email = `User - ${profile.displayName}`;

    const user = await this.authService.findOrCreateUser({
      email,
      name: profile.displayName || profile.emails[0].value.split('@')[0],
      provider: 'github',
      avatar: profile.photos?.[0]?.value || null,
    });
    return { ...user, redirect_uri: req.query.state };
  }
}
