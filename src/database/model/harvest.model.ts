import mongoose, { Document, Schema } from 'mongoose';
import ICrop from './crop.model';
import IQuantity from './quantity.model';


//@TODO Change quantity type

interface IHarvest extends Document {
    _id?: mongoose.Types.ObjectId
    quantity: IQuantity
    crop: ICrop
    rate: number
    farmer: mongoose.Types.ObjectId
    createdAt: Date
    updatedAt: Date
    producedAt: Date
    bestUntil: number
}

const harvestSchema = new Schema<IHarvest>({
    quantity: {
        type: Schema.Types.ObjectId,
        ref: 'Quantity',
        required: true
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
        ref: 'Farmer',
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
    producedAt: {
        type: Date,
        default: Date.now(),
        immutable: true
    },
    bestUntil: {
        type: Number
    }

});

export const Crop = mongoose.model<IHarvest>('Harvest', harvestSchema);

export default IHarvest;
