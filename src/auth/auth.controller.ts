
import { Body, Controller, Post, HttpCode, HttpStatus, Headers, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/customs/custom-decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  logIn(@Body() signInDto: Record<string, any>) {
    return this.authService.logIn(signInDto.mail, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  signUp(@Body() reqBody) {
    return this.authService.signUp(reqBody);
  }

  /*
  @HttpCode(HttpStatus.OK)
  @Post('verify-otp')
  verifyOTP(
    @Req() request,
  ) {
    return this.authService.verifyOTP(request);
  }
  */

}
