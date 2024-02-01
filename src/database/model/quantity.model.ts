import mongoose, { Schema } from "mongoose" 


export default interface IQuantity{
    amount: number,
    unit?: string
}

const quantitySchema= new Schema<IQuantity>({
    amount: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    }
})

export const Qunatity= mongoose.model<IQuantity>('Quantity', quantitySchema);