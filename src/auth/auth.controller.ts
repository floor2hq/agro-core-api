
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
    return this.authService.logIn(signInDto.username, signInDto.password);
  }

  /* user registers with mail and password , and ph no. and /POSTS in this route
   the route extracts these params,creates a JWT Token and embeds otp in it.
  */

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  signUp(@Body() reqBody) {
    return this.authService.signUp(reqBody['username'], reqBody['password']);
  }

  @HttpCode(HttpStatus.OK)
  @Post('verify-otp')
  verifyOTP(
    @Req() request,
  ) {
    return this.authService.verifyOTP(request);
  }

}

/**
 * eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNvdWJoaWsiLCJwYXNzd29yZCI6ImdvbmdvbmdvbiIsIm90cCI6IjA3MjQ5NyIsImlhdCI6MTcwNjU5NDA2MCwiZXhwIjoxNzA2NjgwNDYwfQ.JGaA7XApdXfUmCKLVgoIiIa1-jvH0vCA0Z97otD-WHs
 */