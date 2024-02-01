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
exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../helpers/config");
const connectionURI = config_1.dbConfig.dbURI;
function connectToDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            mongoose_1.default.connect(connectionURI);
            exports.db = mongoose_1.default.connection;
            exports.db.on('error', (e) => {
                console.log(`Error connecting to database: ${e.message}`);
            });
            exports.db.once('open', () => {
                console.log("Database connection successful");
            });
        }
        catch (e) {
            console.log(e.message);
        }
    });
}
exports.default = connectToDB;
