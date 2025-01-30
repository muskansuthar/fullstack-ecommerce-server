import mongoose from "mongoose"

const productRamsSchema = mongoose.Schema({
    productRam: {
        type: String,
        default: ''
    },
})

export const ProductRams = mongoose.model('ProductRams', productRamsSchema);