import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async createJwtToken(user: any) {
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
    };
  }

  async findOrCreateUser(profile: any) {
    const user = await this.prisma.user.findUnique({
      where: { email: profile.email },
    });

    if (!user) {
      return this.prisma.user.create({
        data: {
          email: profile.email,
          name: profile.name,
          password: '',
        },
      });
    }
    return user;
  }
}
