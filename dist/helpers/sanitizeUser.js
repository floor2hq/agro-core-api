"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sanitizeUser(user) {
    const sanitizedUser = {
        _id: user === null || user === void 0 ? void 0 : user._id,
        name: user === null || user === void 0 ? void 0 : user.name,
        mail: user === null || user === void 0 ? void 0 : user.mail,
        createdAt: user === null || user === void 0 ? void 0 : user.createdAt,
        role: user === null || user === void 0 ? void 0 : user.role
    };
    return sanitizedUser;
}
exports.default = sanitizeUser;
