import { NextFunction, Request, Response } from "express";
import IUser from "../database/model/user.model";
import jwt from "jsonwebtoken"

interface customReq extends Request {
    user?:IUser
}

const authenticateToken = (req: customReq, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];
    // @ts-ignore
    console.log("aya")
    if (!token) return res.status(401).end("No Token,access denied");
    // @ts-ignore
    jwt.verify(token, process.env.JWT_SECRET, (err: any, user: any) => {
        if (err) return res.status(401).end("Token Invalid.");
        console.log("User : ",user);
        req.user = user
        next();
    });
};

export default authenticateToken