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
const farm_model_1 = require("../database/model/farm.model");
const mongoose_1 = __importDefault(require("mongoose"));
// import mongoose from "mongoose";
const farmRouter = express_1.default.Router();
// Create Farm
farmRouter.post("/", authenticateToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { location, size, crops } = req.body;
    // @ts-ignore
    const owner = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user._id;
    console.log("owner = ", owner);
    try {
        const newFarm = new farm_model_1.Farm({
            location,
            size,
            crops,
            owner
        });
        const savedFarm = yield newFarm.save();
        res.status(200).json(savedFarm);
    }
    catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }
}));
// Read Farm (Farmer's Perspective)
farmRouter.get("/", authenticateToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    // @ts-ignore
    let ownerId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.user._id;
    ownerId = new mongoose_1.default.Types.ObjectId(ownerId);
    // console.log(ownerId);
    try {
        const allFarms = yield farm_model_1.Farm.find({
            owner: new mongoose_1.default.Types.ObjectId(ownerId)
        })
            .populate('crops')
            .populate('owner');
        res.status(200).json(allFarms);
    }
    catch (error) {
        console.log(error.message);
        res.status(400).json({
            error: error.message,
        });
    }
}));
farmRouter.patch("/", authenticateToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { _id, location, size, crops } = req.body;
    // @ts-ignore
    const owner = (_c = req.user) === null || _c === void 0 ? void 0 : _c.user._id;
    try {
        const updatedFarm = yield farm_model_1.Farm.updateOne({ _id }, {
            location,
            size,
            crops
        });
        res.status(200).send(updatedFarm);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
}));
farmRouter.delete("/", authenticateToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const { _id } = req.body;
    // @ts-ignore
    const owner = (_d = req.user) === null || _d === void 0 ? void 0 : _d.user._id;
    try {
        const deletedFarm = yield farm_model_1.Farm.deleteOne({ _id });
        res.status(200).send(deletedFarm);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
}));
exports.default = farmRouter;
