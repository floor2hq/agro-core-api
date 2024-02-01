import IUser from "../database/model/user.model";

function sanitizeUser(user: IUser) {

    const sanitizedUser = {
        _id: user._id,
        name: user.name,
        mail: user.mail,
        createdAt: user.createdAt,
        role: user.role
    }

    return sanitizedUser;
}

export default sanitizeUser;