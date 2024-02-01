import express, { Request, Response } from "express";
import authenticateToken from "../helpers/authenticateToken";
import IUser from "../database/model/user.model";
import IFarm, { Farm } from "../database/model/farm.model";
import mongoose from "mongoose";
// import mongoose from "mongoose";
const farmRouter = express.Router();


interface customReq extends Request {
    user?: IUser
}

// Create Farm
farmRouter.post("/", authenticateToken, async (req: customReq, res: Response): Promise<any> => {
    const { location, size, crops } = req.body;
    // @ts-ignore
    const owner = req.user?.user._id;
    console.log("owner = ", owner);
    try {
        const newFarm = new Farm({
            location,
            size,
            crops,
            owner
        });
        const savedFarm = await newFarm.save();
        res.status(200).json(savedFarm);
    } catch (error: any) {
        console.log(error.message);
        res.status(400).json(error.message);
    }
})

// Read Farm (Farmer's Perspective)
farmRouter.get("/", authenticateToken, async (req: customReq, res: Response): Promise<any> => {
    // @ts-ignore
    let ownerId = req.user?.user._id;
    ownerId = new mongoose.Types.ObjectId(ownerId)
    console.log(ownerId);
    try {
        const allFarms: IFarm[] | null = await Farm.find({
            owner: new mongoose.Types.ObjectId(ownerId)
        })

        res.status(200).json(allFarms);

    } catch (error: any) {
        console.log(error.message);
        res.status(400).json({
            error: error.message,
        })
    }
})

export default farmRouter;
