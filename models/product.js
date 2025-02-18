import mongoose from "mongoose"

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    images: [
        {
            type: String,
            required: true
        }
    ],
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    productSize: [{
        type: String,
        default: null,
    }]
}, { timestamps: true })


export const Product = mongoose.model('Product', productSchema);