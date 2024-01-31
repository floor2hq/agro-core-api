import { NextFunction, Request, Response } from "express";

interface customReq extends Request {
    user?:any
}

const authenticateToken = (req: customReq, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];
    // @ts-ignore
    console.log("aya")
    if (!token) return res.status(401).end("No Token,access denied");
    // @ts-ignore
    jwt.verify(token, process.env.JWT_SECRET, (err: any, user: any) => {
        if (err) return res.sendStatus(403);
        req.user = user
        next();
    });
};

export default authenticateToken