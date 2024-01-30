
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './schema/user.schema';
import { Model } from 'mongoose';

export type User = any;

@Injectable()
export class UsersService {

    constructor(@InjectModel(Users.name) private usersModel: Model<Users>) { }


    async create(createUsersDto: any): Promise<UsersDocument> {
        console.log(createUsersDto)
        const userExist = await this.usersModel.findOne({
            mail:createUsersDto['mail']
        })
        if(userExist) throw new BadRequestException("User exists");
        const createdUser = await this.usersModel.create(
            createUsersDto
        );
        return createdUser.save();
    }

    async findOneMail(mail:string) :Promise<Users> {
        const user = await this.usersModel.findOne({
            mail,
        })
        if(!user) throw new ForbiddenException();
        return user;
    }


}
