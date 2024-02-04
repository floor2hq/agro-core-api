import express, { Request, Response } from "express";
import authenticateToken from "../helpers/authenticateToken";
import IUser from "../database/model/user.model";
import mongoose from "mongoose";
import ILot, { Lot } from "../database/model/lot.model";

interface customReq extends Request {
    user?: IUser
}

const LotRouter = express.Router();

LotRouter.post("/", authenticateToken, async (req: customReq, res: Response) => {
    const { quantity, crop, rate, storedAt, farm, harvest } = req.body;

    try {
        const newLot = new Lot({
            quantity,
            crop,
            rate,
            //@ts-ignore
            owner: req.user?.user._id,
            storedAt,
            farm,
            harvest
        })


        const savedHarvest: ILot = await newLot.save()

        console.log(`Lot ${savedHarvest._id} saved successfully`)
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
        const allLotsOfOwner = await Lot.find({ owner: new mongoose.Types.ObjectId(ownerID) })

        console.log(allLotsOfOwner)
        res.json(allLotsOfOwner)
    } catch (error: any) {
        console.error("Error", error.message);
        res.status(500).json({ error: error.message });
    }
})

// GET All Surplus / Lot (FARMER's PERSPECTIVE)
LotRouter.get("/", authenticateToken, async (req: customReq, res: Response) => {

    // @ts-ignore
    const ownerID = req.user?.user._id
    try {
        const allHarvests = await Lot.find()

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
        const updatedLot = await Lot.findByIdAndUpdate(req.params.id, { new: true, update: lotUpdate })

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
        const deletedLot = await Lot.findByIdAndDelete(req.params.id)
        console.log(req.params.id)
        console.log(deletedLot)
        res.json(deletedLot)
    } catch (error: any) {
        console.error("Error", error.message);
        res.status(500).json({ error: error.message });
    }
})



export default LotRouter