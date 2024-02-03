import express, { Request, Response } from "express"
import authenticateToken from "../helpers/authenticateToken";
import IUser from "../database/model/user.model";
import { Harvest } from "../database/model/harvest.model";
import bestUntilFx from "../helpers/bestUntilfx";
import { Document } from "mongoose";

const distributorRouter = express.Router();

interface customReq extends Request {
    user?: IUser
}

// GET all Harvest ~ Surplus
distributorRouter.get("/", authenticateToken, async (req: customReq, res: Response) => {
    // @ts-ignore
    const farmerID = req.user?.user._id
    try {
        // @ts-ignore
        let allHarvests: Document<Harvest[]> = await Harvest.find({})
            .populate({
                path: 'farmer',
                select: ['_id', 'name', 'mail', 'phone']
            })
            .populate({
                path: 'crop',
            })
            .populate({
                path: 'farm',
                select: ['_id', 'location', 'size']
            })

        //  @ts-ignore
        allHarvests.forEach((harvest: Harvest) => {
            // @ts-ignore
            harvest['bestUntil'] = bestUntilFx(harvest['producedAt'], harvest['crop']['lifespan']);
        });
        console.log(allHarvests)
        res.status(200).json(allHarvests)
    } catch (error: any) {
        console.error("Error fetching crops", error.message);
        res.status(500).json({ error: error.message });
    }
})

distributorRouter.get("/:cropId", async (req: customReq, res: Response) => {
    const crop = req.params.cropId;

    // @ts-ignore
    const specificCrops: Document<Harvest[]> = await Harvest.find({
        crop
    })
    .populate({
        path: 'farmer',
        select: ['_id', 'name', 'mail', 'phone']
    })
    .populate({
        path: 'crop',
    })
    .populate({
        path: 'farm',
        select: ['_id', 'location', 'size']
    })
    
    console.log(specificCrops)
    res.json(specificCrops);
})

export default distributorRouter