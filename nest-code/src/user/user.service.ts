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
        id: userId, // specify the id of the user you want to delete
      },
      include: {
        bookmarks: true, // include the user's bookmarks in the query
      },
    });

    // Delete all bookmarks associated with the user
    await this.prisma.bookMark.deleteMany({
      where: {
        userId: user.id,
      },
    });

    // Delete the user
    await this.prisma.user.delete({
      where: {
        id: user.id,
      },
    });
  }
}
