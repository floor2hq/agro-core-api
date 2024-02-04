import express, { Request, Response } from "express";
import authenticateToken from "../helpers/authenticateToken";
import IStorage, {Storage} from "../database/model/storage.model";
import mongoose from "mongoose";
import IUser from "../database/model/user.model";
const StorageRouter = express.Router();

interface customReq extends Request {
    user?: IUser
}

StorageRouter.post("/", authenticateToken, async (req: customReq, res: Response): Promise<any> => {
   
    const {location, capacity, crops} = req.body;
    // @ts-ignore
    const owner = req.user?.user._id;
    console.log("owner = ", owner);
    try {
        const newStorage = new Storage({
            location,
            capacity,
            crops,
            owner
        });
        const savedStorage = await newStorage.save();
        res.status(200).json(savedStorage);
    } catch (error: any) {
        console.log(error.message);
        res.status(400).json(error.message);
    }
})

StorageRouter.get("/", authenticateToken, async (req: customReq, res: Response): Promise<any> => {
    // @ts-ignore
    let ownerId = req.user?.user._id;
    ownerId = new mongoose.Types.ObjectId(ownerId)
    // console.log(ownerId);
    try {
        const allStorage: IStorage[] | null = await Storage.find({
            owner: new mongoose.Types.ObjectId(ownerId)
        })

        res.status(200).json(allStorage);
    } catch (error: any) {
        console.log(error.message);
        res.status(400).json({
            error: error.message,
        })
    }
})

StorageRouter.patch("/", authenticateToken, async (req: customReq, res: Response): Promise<any> => {
    const { _id, location, capacity, crops } = req.body;
    // @ts-ignore
    const owner = req.user?.user._id;
    try {
        const updatedStorage: any = await Storage.updateOne({ _id }, {
            location,
            capacity,
            crops
        })
        res.status(200).send(updatedStorage);
    } catch (error: any) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
})

StorageRouter.delete("/:id", authenticateToken, async (req: customReq, res: Response): Promise<any> => {
    // @ts-ignore
    const owner = req.user?.user._id;
    try {
        const deletedStorage: any = await Storage.deleteOne(req.body.params)
        res.status(200).send(deletedStorage);
    } catch (error: any) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
})
export default StorageRouter;
