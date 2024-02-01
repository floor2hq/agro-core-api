import express, { Request, Response } from "express";
import { Harvest } from "../database/model/harvest.model";


const HarvestRouter = express.Router();

HarvestRouter.post("/", async (req: Request, res: Response) => {
    const { quantity, crop, rate, farmer, producedAt } = req.body;

    try {
        const newHarvest = new Harvest({
            quantity,
            crop,
            rate,
            farmer,
            producedAt
        })

        const savedHarvest: any = await newHarvest.save();
        console.log(`Harvest ${savedHarvest._id} saved successfully`)
        res.json(savedHarvest);
    } catch (error: any) {
        console.error("Error saving crop:", error.message);
        res.status(500).json({ error: error.message });
    }
})

HarvestRouter.get("/", async (_: Request, res: Response) => {

    try {
        const allCrops= await Harvest.find({});
        console.log(allCrops)
        res.json(allCrops)
    } catch (error: any) {
        console.error("Error fetching crops", error.message);
        res.status(500).json({ error: error.message });
    }
})


export default HarvestRouter