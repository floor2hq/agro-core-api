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
const user_model_1 = require("../database/model/user.model");
const registrationRouter = express_1.default.Router();
registrationRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, mail, password, role, phone } = req.body;
    try {
        const newUser = new user_model_1.User({
            name,
            mail,
            password,
            role,
            phone
        });
        const savedUser = yield newUser.save();
        res.send(savedUser.toObject());
    }
    catch (error) {
        console.error("Error saving user:", error.message);
        res.status(500).json({ error: error.message });
    }
}));
exports.default = registrationRouter;
