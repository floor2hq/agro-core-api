import express, { Request, Response } from "express";
import IHarvest, { Harvest } from "../database/model/harvest.model";
import authenticateToken from "../helpers/authenticateToken";
import IUser from "../database/model/user.model";
import mongoose from "mongoose";

interface customReq extends Request {
    user?: IUser
}

const LotRouter = express.Router();

LotRouter.post("/", authenticateToken, async (req: customReq, res: Response) => {
    const { quantity, crop, rate, producedAt,farm } = req.body;

    try {
        const newLot = new Harvest({
            quantity,
            crop,
            rate,
            //@ts-ignore
            farmer: req.user?.user._id,
            producedAt,
            farm
        })


        const savedHarvest: IHarvest = await newLot.save()

        console.log(`Harvest ${savedHarvest._id} saved successfully`)
        res.json(savedHarvest);
    } catch (error: any) {
        console.error("Error creating harvest:", error.message);
        res.status(500).json({ error: error.message });
    }
})

LotRouter.get("/", authenticateToken, async (req: customReq, res: Response) => {

    // @ts-ignore
    const ownerID = req.user?.user._id
    try {
        const allLotsOfOwner = await Harvest.find({ farmer: new mongoose.Types.ObjectId(ownerID) })

        console.log(allLotsOfOwner)
        res.json(allLotsOfOwner)
    } catch (error: any) {
        console.error("Error", error.message);
        res.status(500).json({ error: error.message });
    }
})

// GET All Surplus / Harvest (FARMER's PERSPECTIVE)
LotRouter.get("/", authenticateToken ,async (req: customReq, res: Response) => {

    // @ts-ignore
    const ownerID = req.user?.user._id
    try {
        const allHarvests = await Harvest.find()

        console.log(allHarvests)
        res.json(allHarvests)
    } catch (error: any) {
        console.error("Error", error.message);
        res.status(500).json({ error: error.message });
    }
})


LotRouter.patch("/:id", authenticateToken, async (req: customReq, res: Response) => {

    // @ts-ignore
    const lotUpdate = req.body
    try {
        const updatedLot = await Harvest.findByIdAndUpdate(req.params.id, {new:true , update: lotUpdate})
 
        console.log(updatedLot)
        res.json(updatedLot)
    } catch (error: any) {
        console.error("Error: ", error.message);
        res.status(500).json({ error: error.message });
    }
})

LotRouter.delete("/:id", authenticateToken, async (req: customReq, res: Response) => {

    // @ts-ignore
    const ownerID = req.user?.user._id
    try {
        const deletedLot = await Harvest.findByIdAndDelete(req.params.id)
        console.log(req.params.id)
        console.log(deletedLot)
        res.json(deletedLot)
    } catch (error: any) {
        console.error("Error", error.message);
        res.status(500).json({ error: error.message });
    }
})



export default LotRouter