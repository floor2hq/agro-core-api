import mongoose, { Document, Schema } from 'mongoose';
import ROLE from '../../constants/role.enum';

interface IUser extends Document {
    _id?: mongoose.Types.ObjectId
    name: string    
    mail: string;
    createdAt: Date;
    password:string;
    role:ROLE
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
        unique:true
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
        type:String,
        enum: ROLE,
        default:ROLE.FARMER,
    },
});

export const User = mongoose.model<IUser>('User', userSchema, 'users');

export default IUser;
