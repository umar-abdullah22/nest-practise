import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UserDto } from './dto/user-dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async editUser(userId: number, dto: UserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });
    delete user.hash;
    return user;
  }
  async deleteUser(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new ForbiddenException('user not found');
    }

    return await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
