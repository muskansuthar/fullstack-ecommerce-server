import mongoose from "mongoose"

const productEdgeSchema = mongoose.Schema({
    edge: {
        type: String,
        required: true
    },
    images: [
        {
            type: String,
            required: true
        }
    ],
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
}, { timestamps: true }) 

export const Productedges = mongoose.model('Productedges', productEdgeSchema);