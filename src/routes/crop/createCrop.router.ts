import express, { Request, Response } from "express";
import { Crop } from "../../database/model/crop.model";


const createCropRouter = express.Router();

createCropRouter.post("/", async (req: Request, res: Response) => {
    const { name, variety, lifespan } = req.body;

    try {
        const newCrop = new Crop({
            name,
            variety,
            lifespan
        })

        const savedCrop: any = await newCrop.save();
        console.log(`Crop ${savedCrop.variety} ${savedCrop.name} saved successfully`)
        res.json(savedCrop);
    } catch (error: any) {
        console.error("Error saving crop:", error.message);
        res.status(500).json({ error: error.message });
    }
})

export default createCropRouter