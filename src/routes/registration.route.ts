import express, { Request, Response } from "express";
import IUser, { User } from "../database/model/user.model";

const registrationRouter = express.Router();

registrationRouter.post("/", async (req: Request, res: Response): Promise<any> => {
    const { name, mail, password, role }: IUser = req.body;
    try {
        const newUser = new User({
            name,
            mail,
            password,
            role
        })
        const savedUser: any = await newUser.save();
        res.send(savedUser.toObject());
    } catch (error: any) {
        console.error("Error saving user:", error.message);
        res.status(500).json({ error: error.message });
    }
})

export default registrationRouter;
