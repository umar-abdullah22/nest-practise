import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.servies';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    //@Req() req: Request
    // console.log({ dto: { email: dto.email, password: dto.password } }); //dto:dto
    return this.authservice.signup(dto);
  }
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto: AuthDto) {
    return this.authservice.login(dto);
  }
}
