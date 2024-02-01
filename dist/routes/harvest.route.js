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
const harvest_model_1 = require("../database/model/harvest.model");
const HarvestRouter = express_1.default.Router();
HarvestRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { quantity, crop, rate, farmer, producedAt } = req.body;
    try {
        const newHarvest = new harvest_model_1.Harvest({
            quantity,
            crop,
            rate,
            farmer,
            producedAt
        });
        const savedHarvest = yield newHarvest.save();
        console.log(`Harvest ${savedHarvest._id} saved successfully`);
        res.json(savedHarvest);
    }
    catch (error) {
        console.error("Error saving crop:", error.message);
        res.status(500).json({ error: error.message });
    }
}));
HarvestRouter.get("/", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCrops = yield harvest_model_1.Harvest.find({});
        console.log(allCrops);
        res.json(allCrops);
    }
    catch (error) {
        console.error("Error fetching crops", error.message);
        res.status(500).json({ error: error.message });
    }
}));
exports.default = HarvestRouter;
