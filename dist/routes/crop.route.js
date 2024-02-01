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
const crop_model_1 = require("../database/model/crop.model");
const authenticateToken_1 = __importDefault(require("../helpers/authenticateToken"));
const isAdmin_1 = __importDefault(require("../helpers/isAdmin"));
const CropRouter = express_1.default.Router();
CropRouter.post("/", authenticateToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, variety, lifespan } = req.body;
    try {
        const newCrop = new crop_model_1.Crop({
            name,
            variety,
            lifespan
        });
        const savedCrop = yield newCrop.save();
        console.log(`Crop ${savedCrop.variety} ${savedCrop.name} saved successfully`);
        res.json(savedCrop);
    }
    catch (error) {
        console.error("Error saving crop:", error.message);
        res.status(500).json({ error: error.message });
    }
}));
CropRouter.get("/", authenticateToken_1.default, (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCrops = yield crop_model_1.Crop.find({});
        console.log(allCrops);
        res.json(allCrops);
    }
    catch (error) {
        console.error("Error fetching crops", error.message);
        res.status(500).json({ error: error.message });
    }
}));
CropRouter.patch("/", authenticateToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, name, variety, lifespan } = req.body;
        const updatedCrop = yield crop_model_1.Crop.updateOne({ _id }, {
            name,
            variety,
            lifespan
        });
        res.status(200).send(updatedCrop);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
}));
CropRouter.delete("/", authenticateToken_1.default, isAdmin_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.body;
        const deletedCrop = yield crop_model_1.Crop.deleteOne({
            _id
        });
        return res.status(200).json(deletedCrop);
    }
    catch (error) {
        console.log(error.message);
        res.status(404).send(error.message);
    }
}));
exports.default = CropRouter;
