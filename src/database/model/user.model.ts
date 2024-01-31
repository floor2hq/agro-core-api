import mongoose, { Document, Schema } from 'mongoose';
import ROLE, { RolesEnumList } from '../../constants/role.enum';

interface IUser extends Document {
    _id?: mongoose.Types.ObjectId
    name: string    
    email: string;
    createdAt: Date;
    password:string;
    role:ROLE
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }, 
    password: {
        type: String,
        required:true,
    },
    role: {
        enum: RolesEnumList,
        default:ROLE.FARMER,
    },
});

export const User = mongoose.model<IUser>('User', userSchema);

export default IUser;
