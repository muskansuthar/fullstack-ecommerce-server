import express from 'express'
import multer from "multer";
import fs from "fs"
import { HomeBanner } from '../models/homeBanner.js';


const router = express.Router()

var imagesArr = [];
var homeBannerEditId;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

router.post('/upload', upload.array("images"), async (req, res) => {
    if (homeBannerEditId !== undefined) {
        const item = await HomeBanner.findById(homeBannerEditId)
        const images = item.images

        if (images.length !== 0) {
            for (let image of images) {
                fs.unlinkSync(`uploads/${image}`)
            }
        }
    }
    imagesArr = [];
    const files = req.files;

    for (let i = 0; i < files.length; i++) {
        imagesArr.push(files[i].filename)
    }

    return res.json(imagesArr)
})

router.get('/', async (req, res) => {

    try {
        const bannerImagesList = await HomeBanner.find()

        if (!bannerImagesList) {
            return res.status(500).json({ success: false })
        }

        return res.status(200).json(bannerImagesList);
    } catch (error) {
        return res.status(500).json({ success: false })

    }
})

router.get('/:id', async (req, res) => {

    homeBannerEditId = req.params.id;

    const item = await HomeBanner.findById(req.params.id)

    if (!item) {
        return res.status(500).json({ message: 'The home banner with the given ID was not found' })
    }

    return res.status(200).send(item)
})

router.delete('/deleteImage', async (req, res) => {
    const imgUrl = req.query.img;

    if (!imgUrl) {
        return res.status(400).json({ success: false, msg: 'Image URL is required' });
    }

    try {
        const urlArr = imgUrl.split('/');
        const image = urlArr[urlArr.length - 1];

        // Delete the image file from the uploads folder
        const imagePath = `uploads/${image}`;
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        } else {
            return res.status(404).json({ success: false, msg: 'Image not found!' });
        }

        return res.status(200).json({ success: true, msg: 'Image deleted successfully!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, msg: 'Failed to delete the image' });
    }
})

router.delete('/:id', async (req, res) => {

    const item = await HomeBanner.findById(req.params.id)
    const images = item.images;

    if (images.length !== 0) {
        for (let image of images) {
            fs.unlinkSync(`uploads/${image}`)
        }
    }

    const deletedItem = await HomeBanner.findByIdAndDelete(req.params.id)

    if (!deletedItem) {
        return res.status(404).json({
            message: 'Home banner not found!',
            success: false
        })
    }

    return res.status(200).json({
        success: true,
        message: 'Home banner Deleted!'
    })
})


router.post('/create', async (req, res) => {

    let newEntry = new HomeBanner({
        images: imagesArr
    })

    if (!newEntry) {
        return res.status(500).json({
            error: err,
            success: false
        })
    }

    newEntry = await newEntry.save()

    return res.status(201).json(newEntry)
})

router.put('/:id', async (req, res) => {

    const item = await HomeBanner.findByIdAndUpdate(
        req.params.id,
        {
            images: imagesArr
        },
        { new: true }
    )

    if (!item) {
        return res.status(500).json({
            message: 'Home Banner cannot be updated',
            success: false
        })
    }

    return res.send(item);
})

export default router;   