import express, { Request, Response } from "express";
import IHarvest, { Harvest } from "../database/model/harvest.model";
import authenticateToken from "../helpers/authenticateToken";
import IUser from "../database/model/user.model";
import mongoose from "mongoose";
import isAdmin from "../helpers/isAdmin";

interface customReq extends Request {
    user?: IUser
}

const HarvestRouter = express.Router();

HarvestRouter.post("/", authenticateToken, async (req: customReq, res: Response) => {
    const { quantity, crop, rate, producedAt } = req.body;

    try {
        const newHarvest = new Harvest({
            quantity,
            crop,
            rate,
            //@ts-ignore
            farmer: req.user?.user._id,
            producedAt
        })


        const savedHarvest: IHarvest = await newHarvest.save()

        console.log(`Harvest ${savedHarvest._id} saved successfully`)
        res.json(savedHarvest);
    } catch (error: any) {
        console.error("Error creating harvest:", error.message);
        res.status(500).json({ error: error.message });
    }
})

//get all harvests
HarvestRouter.get("/all", authenticateToken, isAdmin, async (req: customReq, res: Response) => {

    // @ts-ignore
    const farmerID = req.user?.user._id
    try {
        const allHarvests = await Harvest.find()

        console.log(allHarvests)
        res.json(allHarvests)
    } catch (error: any) {
        console.error("Error fetching harvest", error.message);
        res.status(500).json({ error: error.message });
    }
})

HarvestRouter.get("/", authenticateToken, async (req: customReq, res: Response) => {

    // @ts-ignore
    const farmerID = req.user?.user._id
    try {
        const allHarvestsOfFarmer = await Harvest.find({ farmer: new mongoose.Types.ObjectId(farmerID) })

        console.log(allHarvestsOfFarmer)
        res.json(allHarvestsOfFarmer)
    } catch (error: any) {
        console.error("Error fetching harvest", error.message);
        res.status(500).json({ error: error.message });
    }
})

HarvestRouter.patch("/:id", authenticateToken, async (req: customReq, res: Response) => {

    // @ts-ignore
    const harvestUpdate = req.body
    try {
        const updatedHarvest = await Harvest.findByIdAndUpdate(req.query.id, harvestUpdate)
 
        console.log(updatedHarvest)
        res.json(updatedHarvest)
    } catch (error: any) {
        console.error("Error updating harvest: ", error.message);
        res.status(500).json({ error: error.message });
    }
})

HarvestRouter.delete("/", authenticateToken, async (req: customReq, res: Response) => {

    // @ts-ignore
    const farmerID = req.user?.user._id
    try {
        const allHarvests = await Harvest.find({ farmer: new mongoose.Types.ObjectId(farmerID) })
        console.log(allHarvests)
        res.json(allHarvests)
    } catch (error: any) {
        console.error("Error fetching crops", error.message);
        res.status(500).json({ error: error.message });
    }
})



export default HarvestRouter