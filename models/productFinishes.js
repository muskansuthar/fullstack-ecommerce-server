import mongoose from "mongoose"

const productFinishSchema = mongoose.Schema({
    finish: {
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

export const Productfinishes = mongoose.model('Productfinishes', productFinishSchema);