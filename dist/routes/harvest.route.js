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
const authenticateToken_1 = __importDefault(require("../helpers/authenticateToken"));
const mongoose_1 = __importDefault(require("mongoose"));
const HarvestRouter = express_1.default.Router();
HarvestRouter.post("/", authenticateToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { quantity, crop, rate, producedAt, farm } = req.body;
    try {
        const newHarvest = new harvest_model_1.Harvest({
            quantity,
            crop,
            rate,
            //@ts-ignore
            farmer: (_a = req.user) === null || _a === void 0 ? void 0 : _a.user._id,
            producedAt,
            farm
        });
        const savedHarvest = yield newHarvest.save();
        console.log(`Harvest ${savedHarvest._id} saved successfully`);
        res.json(savedHarvest);
    }
    catch (error) {
        console.error("Error creating harvest:", error.message);
        res.status(500).json({ error: error.message });
    }
}));
HarvestRouter.get("/", authenticateToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    // @ts-ignore
    const farmerID = (_b = req.user) === null || _b === void 0 ? void 0 : _b.user._id;
    try {
        const allHarvestsOfFarmer = yield harvest_model_1.Harvest.find({ farmer: new mongoose_1.default.Types.ObjectId(farmerID) });
        console.log(allHarvestsOfFarmer);
        res.json(allHarvestsOfFarmer);
    }
    catch (error) {
        console.error("Error fetching harvest", error.message);
        res.status(500).json({ error: error.message });
    }
}));
// GET All Surplus / Harvest (FARMER's PERSPECTIVE)
HarvestRouter.get("/", authenticateToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    // @ts-ignore
    const farmerID = (_c = req.user) === null || _c === void 0 ? void 0 : _c.user._id;
    try {
        const allHarvests = yield harvest_model_1.Harvest.find();
        console.log(allHarvests);
        res.json(allHarvests);
    }
    catch (error) {
        console.error("Error fetching harvest", error.message);
        res.status(500).json({ error: error.message });
    }
}));
HarvestRouter.patch("/:id", authenticateToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const harvestUpdate = req.body;
    try {
        const updatedHarvest = yield harvest_model_1.Harvest.findByIdAndUpdate(req.params.id, { new: true, update: harvestUpdate });
        console.log(updatedHarvest);
        res.json(updatedHarvest);
    }
    catch (error) {
        console.error("Error updating harvest: ", error.message);
        res.status(500).json({ error: error.message });
    }
}));
HarvestRouter.delete("/:id", authenticateToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    // @ts-ignore
    const farmerID = (_d = req.user) === null || _d === void 0 ? void 0 : _d.user._id;
    try {
        const deletedHarvest = yield harvest_model_1.Harvest.findByIdAndDelete(req.params.id);
        console.log(req.params.id);
        console.log(deletedHarvest);
        res.json(deletedHarvest);
    }
    catch (error) {
        console.error("Error deleting harvest", error.message);
        res.status(500).json({ error: error.message });
    }
}));
exports.default = HarvestRouter;
