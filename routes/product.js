import express from 'express'
import { Category } from '../models/category.js';
import { Product } from '../models/product.js';
import multer from "multer";
import fs from "fs"


const router = express.Router()

var imagesArr = [];
var productEditId;

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

    if (productEditId !== undefined) {
        const product = await Product.findById(productEditId)
        const images = product.images

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

router.get('/featured', async (req, res) => {
    let productList = "";
    if (req.query.location !== undefined && req.query.location !== null && req.query.location !== "All") {
        productList = await Product.find({ isFeatured: true, location: req.query.location })
    } else {
        productList = await Product.find({ isFeatured: true })
    }

    if (!productList) {
        return res.status(500).json({ success: false })
    }

    return res.status(200).json(productList);
})

router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const perPage = parseInt(req.query.perPage)
    const totalPosts = await Product.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage)

    if (page > totalPages) {
        return res.status(404).json({ message: "Page not found" })
    }

    let productList = [];

    if (req.query.minPrice !== undefined && req.query.maxPrice !== undefined) {
        if (req.query.subCatId !== undefined && req.query.subCatId !== null && req.query.subCatId !== "") {
            if (req.query.location !== undefined && req.query.location !== null && req.query.location !== "All") {
                productList = await Product.find({ subCatId: req.query.subCatId, location: req.query.location }).populate("category");
            } else {
                productList = await Product.find({ subCatId: req.query.subCatId }).populate("category");
            }
        }

        if (req.query.catId !== undefined && req.query.catId !== null && req.query.catId !== "") {
            if (req.query.location !== undefined && req.query.location !== null && req.query.location !== "All") {
                productList = await Product.find({ catId: req.query.catId, location: req.query.location }).populate("category");
            } else {
                productList = await Product.find({ catId: req.query.catId }).populate("category");
            }
        }

        const filterProducts = productList.filter(product => {
            if (req.query.minPrice && product.price < parseInt(+req.query.minPrice)) {
                return false
            }
            if (req.query.maxPrice && product.price > parseInt(+req.query.maxPrice)) {
                return false
            }
            return true
        })
        if (!productList) {
            res.status(500).json({ success: false })
        }
        return res.status(200).json({
            "products": filterProducts,
            "totalPages": totalPages,
            "page": page
        });
    }
    else if (req.query.page !== undefined && req.query.perPage !== undefined) {

        if (req.query.location !== undefined && req.query.location !== null && req.query.location !== "All") {
            productList = await Product.find({ location: req.query.location }).populate("category").skip((page - 1) * perPage)
                .limit(perPage)
                .exec()
        } else {
            productList = await Product.find().populate("category").skip((page - 1) * perPage)
                .limit(perPage)
                .exec()
        }

        if (!productList) {
            return res.status(500).json({ success: false })
        }
        return res.status(200).json({
            "products": productList,
            "totalPages": totalPages,
            "page": page
        });
    } else {
        if (req.query.location !== undefined && req.query.location !== null && req.query.location !== "All") {
            productList = await Product.find(req.query).populate("category")
        } else if (req.query.location === undefined || req.query.location === null || req.query.location === "All") {
            productList = await Product.find(req.query).populate("category")
        }  
        else {
            productList = await Product.find({ catName: req.query.catName }).populate("category")
        }

        if (!productList) {
            return res.status(500).json({ success: false })
        }

        return res.status(200).json({
            "products": productList,
            "totalPages": totalPages,
            "page": page
        });
    }
})

router.post('/create', async (req, res) => {

    const category = await Category.findById(req.body.category)
    if (!category) {
        return res.status(404).send("Invalid Category!")
    }

    let product = new Product({
        name: req.body.name,
        images: imagesArr,
        price: req.body.price,
        category: req.body.category,
        isFeatured: req.body.isFeatured,
        productSize: req.body.productSize
    })

    product = await product.save();

    if (!product) {
        res.status(500).json({
            error: err,
            success: false
        })
    }

    return res.status(201).json(product)
})

router.get('/:id', async (req, res) => {

    productEditId = req.params.id;
    const product = await Product.findById(req.params.id).populate("category")

    if (!product) {
        return res.status(500).json({ message: 'The product with the given ID was not found' })
    }

    return res.status(200).send(product)
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

    const product = await Product.findById(req.params.id)
    const images = product.images;

    if (images.length !== 0) {
        for (let image of images) {
            fs.unlinkSync(`uploads/${image}`)
        }
    }

    const deletedProduct = await Product.findByIdAndDelete(req.params.id)

    if (!deletedProduct) {
        res.status(404).json({
            message: 'Product not found!',
            success: false
        })
    }

    return res.status(200).json({
        success: true,
        message: 'Product Deleted!'
    })
})

router.put('/:id', async (req, res) => {
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            images: imagesArr,
            price: req.body.price,
            category: req.body.category,
            isFeatured: req.body.isFeatured,
            productSize: req.body.productSize
        },
        { new: true }
    )

    if (!product) {
        return res.status(500).json({
            message: 'Product cannot be updated',
            success: false
        })
    }

    return res.send(product);
})



export default router;      