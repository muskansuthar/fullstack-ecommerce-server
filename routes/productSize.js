import express from 'express'
import { ProductSize } from '../models/productSize.js'


const router = express.Router()

router.get('/', async (req, res) => {

    try {
        const productSizeList = await ProductSize.find()

        if (!productSizeList) {
            return res.status(500).json({ success: false })
        }

        return res.status(200).json(productSizeList);

    } catch (error) {
        res.status(500).json({ success: false })   

    }
})

router.post('/create', async (req, res) => {

    let productSize = new ProductSize({
        productSize: req.body.productSize
    })

    if (!productSize) {
        return res.status(500).json({
            error: err,
            success: false
        })
    }

    productSize = await productSize.save()

    return res.status(201).json(productSize)
})

router.get('/:id', async (req, res) => {

    const productSize = await ProductSize.findById(req.params.id)

    if (!productSize) {
        return res.status(500).json({ message: 'The product Size with the given ID was not found' })
    }

    return res.status(200).send(productSize)
})

router.delete('/:id', async (req, res) => {

    const deletedproductSize = await ProductSize.findByIdAndDelete(req.params.id)

    if (!deletedproductSize) {
        return res.status(404).json({
            message: 'product Size not found!',
            success: false
        })
    }

    return res.status(200).json({
        success: true,
        message: 'product Size Deleted!'
    })
})

router.put('/:id', async (req, res) => {

    const productSize = await ProductSize.findByIdAndUpdate(
        req.params.id,
        {
            productSize: req.body.productSize
        },
        { new: true }
    )

    if (!productSize) {
        return res.status(500).json({
            message: 'product Size cannot be updated',
            success: false
        })
    }

    return res.send(productSize);
})

export default router;  