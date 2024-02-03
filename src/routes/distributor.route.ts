import express, { Request, Response } from "express"
import authenticateToken from "../helpers/authenticateToken";
import IUser from "../database/model/user.model";
import { Harvest } from "../database/model/harvest.model";

const distributorRouter = express.Router();

interface customReq extends Request {
    user?: IUser
}

// GET all farms 
distributorRouter.get("/", authenticateToken, async (req: customReq, res: Response) => {
    // @ts-ignore
    const farmerID = req.user?.user._id
    try {
        const allHarvests = await Harvest.find({})
        .populate({
            path:'farmer',
            select:['name','mail']
        })
        console.log(allHarvests)
        res.status(200).json(allHarvests)
    } catch (error: any) {
        console.error("Error fetching crops", error.message);
        res.status(500).json({ error: error.message });
    }
})


export default distributorRouter