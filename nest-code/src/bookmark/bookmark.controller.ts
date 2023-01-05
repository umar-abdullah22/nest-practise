import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'auth/decorator';
import { JwtGuard } from 'auth/guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}
  @Get()
  getBookmarks(@GetUser('id') userId: number) {
    return this.bookmarkService.getBookmarks(userId);
  }

  @Get(':id')
  getBookmarkbyId(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarId: number,
  ) {
    return this.bookmarkService.getBookmarkbyId(userId, bookmarId);
  }

  @Post()
  createBookmark(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto,
  ) {
    return this.bookmarkService.createBookmark(userId, dto);
  }

  @Patch(':id')
  editBookmarkbyId(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarId: number,
    @Body() dto: EditBookmarkDto,
  ) {
    return this.bookmarkService.editBookmarkbyId(userId, bookmarId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteBookmarkbyId(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarId: number,
  ) {
    return this.bookmarkService.deleteBookmarkbyId(userId, bookmarId);
  }
}
