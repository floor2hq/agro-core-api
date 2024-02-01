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
    // console.log(ownerId);
    try {
        const allFarms: IFarm[] | null = await Farm.find({
            owner: new mongoose.Types.ObjectId(ownerId)
        })
            .populate('crops')
            .populate('owner')

        res.status(200).json(allFarms);
    } catch (error: any) {
        console.log(error.message);
        res.status(400).json({
            error: error.message,
        })
    }
})

farmRouter.patch("/", authenticateToken, async (req: customReq, res: Response): Promise<any> => {
    const { _id, location, size, crops } = req.body;
    // @ts-ignore
    const owner = req.user?.user._id;
    try {
        const updatedFarm: any = await Farm.updateOne({ _id }, {
            location,
            size,
            crops
        })
        res.status(200).send(updatedFarm);
    } catch (error: any) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
})

farmRouter.delete("/", authenticateToken, async (req: customReq, res: Response): Promise<any> => {
    const { _id } = req.body;
    // @ts-ignore
    const owner = req.user?.user._id;
    try {
        const deletedFarm: any = await Farm.deleteOne({ _id })
        res.status(200).send(deletedFarm);
    } catch (error: any) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
})
export default farmRouter;
