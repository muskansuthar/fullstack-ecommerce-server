import mongoose from "mongoose"

const productSizeSchema = mongoose.Schema({
    productSize: {
        type: String,
        default: ''
    },
})

export const ProductSize = mongoose.model('ProductSize', productSizeSchema);