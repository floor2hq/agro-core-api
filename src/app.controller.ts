import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './customs/custom-decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Public()
  @Get()
  getHello(@Req() request): string {
    console.log('user :', request['user']);
    return this.appService.getHello();
  }
}
