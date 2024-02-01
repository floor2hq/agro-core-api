"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sanitizeUser(user) {
    const sanitizedUser = {
        _id: user._id,
        name: user.name,
        mail: user.mail,
        createdAt: user.createdAt,
        role: user.role
    };
    return sanitizedUser;
}
exports.default = sanitizeUser;
