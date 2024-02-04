import mongoose, { Document, Schema } from 'mongoose';
import ICrop from './crop.model';

interface IHarvest extends Document {
    _id?: mongoose.Types.ObjectId;
    quantity: Number;
    crop: ICrop;
    rate: number;
    farmer: mongoose.Types.ObjectId;
    farm: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    producedAt: Date;
    bestUntil: number;
}

const harvestSchema = new Schema<IHarvest>({
    quantity: {
        Number,
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
    farmer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        immutable: true
    },
    farm: {
        type: Schema.Types.ObjectId,
        ref: 'Farm',
        required: true,
        immutable: true,
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
    producedAt: {
        type: Date,
        default: Date.now(),
        immutable: true
    },
    bestUntil: {
        type: Number,
        required: false
    }

});

export const Harvest = mongoose.model<IHarvest>('Harvest', harvestSchema, 'harvests');

export default IHarvest;
