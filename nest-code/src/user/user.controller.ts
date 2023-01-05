import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from 'auth/guard';
import { UserDto } from './dto/user-dto';
import { UserService } from './user.service';
import { GetUser } from 'auth/decorator';
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@Req() req: Request) {
    return req.user;
  }
  // @UseGuards(AuthGuard('jwt'))
  @Get('all')
  getAll() {
    return 'hy from all';
  }
  @Patch(':id')
  editUser(@Param('id', ParseIntPipe) uid: string, @Body() dto: UserDto) {
    const id = parseInt(uid, 10);
    // editUser(@GetUser('id') userId: number, @Body() dto: UserDto) {
    return this.userService.editUser(id, dto);
  }
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) uid: string) {
    const id = parseInt(uid, 10);
    // deleteUser(@GetUser('id') userId: number) {
    return this.userService.deleteUser(id);
  }
}
