import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './schema/user.schema';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    ConfigModule,
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ],
  providers: [
    UsersService
  ],
  controllers:[
    UserController
  ],
  exports: [UsersService]
})
export class UsersModule { }
