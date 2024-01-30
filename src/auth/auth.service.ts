import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import generateOTP from 'src/util/generateOTP';
import { jwtConstants } from './constants';
import { Request } from 'express';
import axios from 'axios';
import { UsersDocument } from 'src/users/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async logIn(
    mail: string,
    password: string,
  ): Promise<{ token: string } | UnauthorizedException> {
    const user = await this.usersService.findOneMail(mail);
    if (user.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { user };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(reqBody: any): Promise<UsersDocument> {
    // const otp = generateOTP();
    // const microserviceUrl = 'http://microservice-url/send-mail';

    // const payload = {
    //     username,
    //     password,
    //     otp
    // };

    // try {
    //     const emailRequest = await axios.post(microserviceUrl, payload);
    //     const token = await this.jwtService.signAsync(payload);
    //     console.log(emailRequest)

    //     return {
    //         token
    //     };

    // } catch (error) {
    //     throw new Error('Failed to sign up or send mail');
    // }
    const user = await this.usersService.create(reqBody);
    console.log(user);
    return user;
  }

  /*
    async verifyOTP(request: Request) {
        const otpFromJWT = request['user'];
        const typedOTP = request.body['otp'];
        if (otpFromJWT === typedOTP) return { verified: true };
        else return { verified: false };
    }
    */
}
