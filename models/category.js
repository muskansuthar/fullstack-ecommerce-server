import mongoose from "mongoose"

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    images: [
        {
            type: String
        }
    ],
    color: {
        type: String
    },
    parentId: {
        type: String
    }
}, { timestamps: true }) 


// for convert _id to id

// categorySchema.virtual('id').get(function () {
//     return this._id.toHexString();
// })

// categorySchema.set('toJSON', {
//     virtual:true,
// })

export const Category = mongoose.model('Category', categorySchema);