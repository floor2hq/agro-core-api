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
// import { dbConfig } from '../helpers/config'
// Fuck Your Configs , @majorbruteforce
// I Wasted ~30mins here
const connectionURI = `mongodb+srv://soubhik:soubhik@cluster0.1vpjft8.mongodb.net/?retryWrites=true&w=majority`;
function connectToDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(connectionURI);
            console.log("Connection Successful");
            // Fuck your db.ons again
            // db = mongoose.connection
            // db.on('error', (e: Error) => {
            //     console.log(`Error connecting to database: ${e.message}`)
            // })
            // db.once('open', () => {
            //     console.log("Database connection successful");
            // })
        }
        catch (e) {
            console.log(e.message);
        }
    });
}
exports.default = connectToDB;
