"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = exports.appConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.appConfig = {
    "hostProd": process.env.HOST_PROD || 'localhost',
    "portProd": process.env.PORT_PROD || '3000'
};
exports.dbConfig = {
    "dbUser": (_a = process.env.MONGO_USER) !== null && _a !== void 0 ? _a : "",
    "dbPassword": (_b = process.env.MONGO_PASSWORD) !== null && _b !== void 0 ? _b : "",
    "dbURI": (_c = process.env.DB_URI) !== null && _c !== void 0 ? _c : ""
};
