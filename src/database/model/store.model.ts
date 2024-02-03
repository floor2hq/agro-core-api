import mongoose, { Document, Schema } from 'mongoose';
import ICrop from './crop.model';

type qunatityType = {
    amount: number,
    unit: string
}

interface IStore extends Document {
    _id?: mongoose.Types.ObjectId
    quantity: qunatityType
    crop: ICrop
    rate: number
    owner: mongoose.Types.ObjectId
    createdAt: Date
    updatedAt: Date
    storedAt: Date
    harvest: mongoose.Types.ObjectId
    bestUntil: number
}

const storeSchema = new Schema<IStore>({
    quantity: {
        type: {
            amount: Number,
            unit: String
        },
        required: true,
        _id: false
        
    },
    crop: {
        type: Schema.Types.ObjectId,
        ref: 'Crop',  // Reference to the Crop model
        required: true,
        immutable: true
    },
    rate: {
        type: Number,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        immutable: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    storedAt: {
        type: Date,
        default: Date.now(),
        immutable: true
    },
    bestUntil: {
        type: Number,
        required: false
    },
    harvest: {
        type: Schema.Types.ObjectId,
        ref: 'Harvest',
        required: true,
        immutable: true
    }

});

export const Store = mongoose.model<IStore>('Store', storeSchema, 'stores');

export default IStore;
