"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticateToken_1 = __importDefault(require("../helpers/authenticateToken"));
const harvest_model_1 = require("../database/model/harvest.model");
const bestUntilfx_1 = __importDefault(require("../helpers/bestUntilfx"));
const distributorRouter = express_1.default.Router();
// GET all Harvest ~ Surplus
distributorRouter.get("/", authenticateToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // @ts-ignore
    const farmerID = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user._id;
    try {
        // @ts-ignore
        let allHarvests = yield harvest_model_1.Harvest.find({})
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
        });
        //  @ts-ignore
        allHarvests.forEach((harvest) => {
            // @ts-ignore
            harvest['bestUntil'] = (0, bestUntilfx_1.default)(harvest['producedAt'], harvest['crop']['lifespan']);
        });
        console.log(allHarvests);
        res.status(200).json(allHarvests);
    }
    catch (error) {
        console.error("Error fetching crops", error.message);
        res.status(500).json({ error: error.message });
    }
}));
distributorRouter.get("/:cropId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const crop = req.params.cropId;
    // @ts-ignore
    const specificCrops = yield harvest_model_1.Harvest.find({
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
    });
    console.log(specificCrops);
    res.json(specificCrops);
}));
exports.default = distributorRouter;
