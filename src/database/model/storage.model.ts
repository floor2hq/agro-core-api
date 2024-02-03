import mongoose, { Document, Schema } from 'mongoose';
import ICrop from './crop.model';
import IUser from './user.model';

interface IStorage extends Document {
    location: string;
    capacity: number;
    crops: ICrop[];
    owner: IUser
}

const storageSchema = new Schema<IStorage>({
    location: {
        type: String,
        required: true
    },
    capacity: {
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

export const Storage = mongoose.model<IStorage>('Storage', storageSchema, 'storages');

export default IStorage;
