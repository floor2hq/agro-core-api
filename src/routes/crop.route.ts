import express, { Request, Response } from "express";
import ICrop, { Crop } from "../database/model/crop.model";
import authenticateToken from "../helpers/authenticateToken";
import isAdmin from "../helpers/isAdmin";

const CropRouter = express.Router();

CropRouter.post("/", authenticateToken,  isAdmin,  async (req: Request, res: Response) => {
    const { name, variety, lifespan } = req.body;

    try {
        const newCrop = new Crop({
            name,
            variety,
            lifespan
        })

        const savedCrop: ICrop = await newCrop.save();
        console.log(`Crop ${savedCrop.variety} ${savedCrop.name} saved successfully`)
        res.json(savedCrop);
    } catch (error: any) {
        console.error("Error saving crop:", error.message);
        res.status(500).json({ error: error.message });
    }
})

CropRouter.get("/", async ( _: Request, res: Response) => {

    try {
        const allCrops = await Crop.find({});
        res.json(allCrops)
    } catch (error: any) {
        console.error("Error fetching crops", error.message);
        res.status(500).json({ error: error.message });
    }
})

CropRouter.patch("/", authenticateToken,  isAdmin,  async (req: Request, res: Response) => {

    try {
        const { _id, name, variety, lifespan } = req.body;
        const updatedCrop: any = await Crop.updateOne({ _id }, {
            name,
            variety,
            lifespan
        })
        res.status(200).send(updatedCrop);
    } catch (error: any) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
})

CropRouter.delete("/", authenticateToken, isAdmin, async (req: Request, res: Response) => {
    try {
        const { _id } = req.body;

        const deletedCrop: any = await Crop.deleteOne({
            _id
        });

        return res.status(200).json(deletedCrop);
    } catch (error: any) {
        console.log(error.message);
        res.status(404).send(error.message);
    }
})


export default CropRouter