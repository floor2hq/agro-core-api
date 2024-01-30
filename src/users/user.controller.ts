import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/customs/custom-decorator';
import { ConfigService } from '@nestjs/config';

@Controller('users')
export class UserController {
  constructor(
    private readonly usersService: UsersService,
    private configService: ConfigService,
  ) {}

  @Get()
  async test() {
    const dbUser = this.configService.get<string>('DATABASE_USER');
    console.log('dbUser :', dbUser);
    return { hi: 'hi' };
  }

  @Post()
  async create(@Req() request) {
    return await this.usersService.create(request['user']['user']);
  }
}
