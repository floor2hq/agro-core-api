import { NextFunction, Request, Response } from "express";
import IUser from "../database/model/user.model";
import jwt from "jsonwebtoken"

interface customReq extends Request {
    user?:IUser
}

const authenticateToken = (req: customReq, res: Response, next: NextFunction) => {
    // const token = req.header('Authorization')?.split(' ')[1];
    const token = req.header('Authorization');
    // @ts-ignore
    if (!token) return res.status(401).end("No Token,access denied");

    jwt.verify(token, 'saswatgay', (err: any, user: any) => {
        if (err) return res.status(401).end("Token Invalid.");
        req.user = user
        console.log(user)
        next();
    });
};

export default authenticateToken