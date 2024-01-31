import mongoose, { Document, Schema } from 'mongoose';
import ICrop from './crop.model'
import IUser from './user.model';


interface Farm extends Document {
    location: string;
    size: number;
    crops: ICrop[];
    owner: IUser
}

const farmSchema = new Schema<Farm>({
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

const Farm = mongoose.model<Farm>('Farm', farmSchema);

export default Farm;
