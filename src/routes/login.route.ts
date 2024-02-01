import express, { Request, Response } from "express";
import IUser, { User } from "../database/model/user.model";
import jwt from "jsonwebtoken";
import sanitizeUser from "../helpers/sanitizeUser";
const loginRouter = express.Router();

loginRouter.post("/", async (req: Request, res: Response): Promise<IUser | undefined> => {
    const { mail, password }: IUser = req.body;

    try {
        console.log("Entered")
        console.log( { mail, password })
        const user: IUser | null = await User.findOne({
            mail
        })
        console.log(user)
        if (!user) {
            console.log("NO USER FOUND")
            return;
        };

        if (user.password === password) {
            //make a jwt , send jwt + user object
            // @ts-ignore
            const token = jwt.sign({ user }, 'saswatgay', { expiresIn: '24h' });
            res.status(200).json({ token, user:sanitizeUser(user)});
            return;
        }

        res.status(401).json({ error: 'Invalid credentials' });
    } catch (error: any) {
        console.error("Error saving user:", error.message);
        res.status(500).json({ error: error.message });
    }
})

export default loginRouter;
