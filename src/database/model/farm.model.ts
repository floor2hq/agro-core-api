import mongoose, { Document, Schema } from 'mongoose';
import ICrop from './crop.model'
import IUser from './user.model';


interface IFarm extends Document {
    location: string;
    size: number;
    crops: ICrop[];
    owner: IUser
}

const farmSchema = new Schema<IFarm>({
    location: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    crops: [{
        type: Schema.Types.ObjectId,
        ref: 'Crop',  // Reference to the Crop model
        required: true,
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model
        required: true,
    },    
});

export const Farm = mongoose.model<IFarm>('Farm', farmSchema, 'farms');

export default IFarm;
