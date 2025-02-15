import mongoose from "mongoose"

const productTopSchema = mongoose.Schema({
    top: {
        type: String,
        required: true
    },
    images: [
        {
            type: String,
            required: true
        }
    ],
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
}, { timestamps: true }) 

export const Producttops = mongoose.model('Producttops', productTopSchema);