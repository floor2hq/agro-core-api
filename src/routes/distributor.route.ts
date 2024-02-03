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

         // Assuming there are multiple harvests, iterate through them
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


export default distributorRouter