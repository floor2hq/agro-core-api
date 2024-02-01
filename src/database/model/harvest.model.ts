import mongoose, { Document, Schema } from 'mongoose';
import ICrop from './crop.model';
import { TQuantity } from '../types/quantity.type';


interface IHarvest extends Document {
    _id?: mongoose.Types.ObjectId
    quantity: number
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
        type: Number,
        required: true
    },
    crop: {
        type: Schema.Types.ObjectId,
        ref: 'Crop',  // Reference to the Crop model
        required: true,
    }

});

export const Crop = mongoose.model<IHarvest>('Harvest', harvestSchema);

export default IHarvest;
