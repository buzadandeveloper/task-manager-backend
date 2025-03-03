import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async createUser(name: string, email: string, password: string) {
    return this.prisma.user.create({ data: { name, email, password } });
  }

  async updateUser(
    id: number,
    data: Partial<{ name: string; email: string; password: string }>,
  ) {
    return this.prisma.user.update({ where: { id }, data });
  }

  async deleteUser(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
