import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prsima: PrismaService) {}

  getBookmarks(userId: number) {
    return this.prsima.bookMark.findMany({
      where: {
        userId,
      },
    });
  }

  getBookmarkbyId(userId: number, bookmarkId: number) {
    return this.prsima.bookMark.findMany({
      where: {
        id: bookmarkId,
        userId,
      },
    });
  }

  async createBookmark(userId: number, dto: CreateBookmarkDto) {
    const bookmark = await this.prsima.bookMark.create({
      data: {
        userId,
        ...dto,
      },
    });
    return bookmark;
  }

  async editBookmarkbyId(
    userId: number,
    bookmarid: number,
    dto: EditBookmarkDto,
  ) {
    // console.log({ dto });
    //first find the bookmasrk by id
    const bookmark = await this.prsima.bookMark.findUnique({
      where: {
        id: bookmarid,
      },
    });
    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('access denied');
    }
    return this.prsima.bookMark.update({
      where: {
        id: bookmarid,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteBookmarkbyId(userId: number, bookmarId: number) {
    const bookmark = await this.prsima.bookMark.findUnique({
      where: {
        id: bookmarId,
      },
    });
    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('access denied');
    }
    return this.prsima.bookMark.delete({
      where: {
        id: bookmarId,
      },
    });
  }
}
