import mongoose from "mongoose"

const productWeightSchema = mongoose.Schema({
    productWeight: {
        type: String,
        default: ''
    },
})

export const ProductWeight = mongoose.model('ProductWeight', productWeightSchema);