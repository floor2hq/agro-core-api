import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/customs/custom-decorator';

@Controller('users')
export class UserController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async test() {
    return { hi: 'hi' };
  }

  @Post()
  async create(@Req() request) {
    return await this.usersService.create(request['user']['user']);
  }
}
