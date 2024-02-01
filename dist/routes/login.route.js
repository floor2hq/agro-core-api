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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sanitizeUser_1 = __importDefault(require("../helpers/sanitizeUser"));
const loginRouter = express_1.default.Router();
loginRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mail, password } = req.body;
    try {
        console.log("Entered");
        console.log({ mail, password });
        const user = yield user_model_1.User.findOne({
            mail
        });
        console.log(user);
        if (!user) {
            console.log("NO USER FOUND");
            return;
        }
        ;
        if (user.password === password) {
            //make a jwt , send jwt + user object
            // @ts-ignore
            const token = jsonwebtoken_1.default.sign({ user }, process.env.JWT_SECRET, { expiresIn: '24h' });
            res.status(200).json({ token, user: (0, sanitizeUser_1.default)(user) });
            return;
        }
        res.status(401).json({ error: 'Invalid credentials' });
    }
    catch (error) {
        console.error("Error saving user:", error.message);
        res.status(500).json({ error: error.message });
    }
}));
exports.default = loginRouter;
