import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from 'auth/guard';
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  getMe(@Req() req: Request) {
    return req.user;
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  getAll() {
    return 'hy from all';
  }
}
