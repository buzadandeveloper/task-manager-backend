import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import * as process from 'node:process';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
      callbackURL: `${process.env.NODE_ENV === 'development' ? process.env.DEV_BASE_URL : process.env.BASE_URL}/auth/google/callback`,
      scope: ['email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const user = await this.authService.findOrCreateUser({
      email: profile.emails[0].value,
      name: profile.displayName || profile.emails[0].value.split('@')[0],
      provider: 'google',
      avatar: profile.photos?.[0]?.value || null,
    });
    return user;
  }
}
