import mongoose from "mongoose"

const homeBannerSchema = mongoose.Schema({
    images:[{
        type: String,
        required: true
    }]
})


export const HomeBanner = mongoose.model('HomeBanner', homeBannerSchema);