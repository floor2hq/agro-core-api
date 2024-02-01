import mongoose, { Document, Schema } from 'mongoose';

interface ICrop extends Document {
    _id?: mongoose.Types.ObjectId
    name: string
    variety: string
    lifespan: number
}

const cropSchema = new Schema<ICrop>({
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

export const Crop = mongoose.model<ICrop>('Crop', cropSchema, 'crops');

export default ICrop;
