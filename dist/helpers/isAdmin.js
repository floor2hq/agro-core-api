"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const role_enum_1 = __importDefault(require("../constants/role.enum"));
function isAdmin(req, res, next) {
    const { user } = req;
    // @ts-ignore
    if ((user === null || user === void 0 ? void 0 : user.user.role) === role_enum_1.default.ADMIN) {
        next();
    }
    else {
        res.status(400).send("You Ain't Admin, can't Perform this Operation");
    }
    ;
}
exports.default = isAdmin;
