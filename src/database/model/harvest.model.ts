import mongoose, { Document, Schema } from 'mongoose';

interface IHarvest extends Document {
    _id?: mongoose.Types.ObjectId
    name: string
    variety: string
    lifespan: number
}

const harvestSchema = new Schema<IHarvest>({
    name: {
        type: String,
        required: true
    },
    variety : {
        type: String,
        required: true
    },
    lifespan: {
        type: Number,
        required: true
    }
});

export const Crop = mongoose.model<IHarvest>('Harvest', harvestSchema);

export default IHarvest;
