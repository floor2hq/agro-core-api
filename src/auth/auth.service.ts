
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import generateOTP from 'src/util/generateOTP';
import { jwtConstants } from './constants';
import { Request } from 'express';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async logIn(
        username: string,
        pass: string,
    ): Promise<{ access_token: string }> {
        const user = await this.usersService.findOne(username);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.userId, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        }
    }

    async signUp(
        username: string,
        password: string,
    ): Promise<any> {
        const otp = generateOTP();
        console.log(otp);
        const payload = { username, password, otp };
        //send mail here...
        return {
            vToken: await this.jwtService.signAsync(payload),
        }
    }

    async verifyOTP(
        request: Request,
    ) {
        const otpFromJWT = request['user'];
        console.log(otpFromJWT);

        const typedOTP = request.body['otp'];
        console.log(typedOTP);

        if (otpFromJWT === typedOTP) return { verified: true };
        else return { verified: false };
    }
}
