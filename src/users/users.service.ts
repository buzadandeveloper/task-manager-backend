import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

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

  async createUser(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }

  async updateUser(id: number, data: Partial<UpdateUserDto>) {
    return this.prisma.user.update({ where: { id }, data });
  }

  async deleteUser(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
