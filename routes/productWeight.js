import express from 'express'
import { ProductWeight } from '../models/productWeight.js'


const router = express.Router()

router.get('/', async (req, res) => {

    try {
        const productWeightList = await ProductWeight.find()

        if (!productWeightList) {
            return res.status(500).json({ success: false })
        }

        return res.status(200).json(productWeightList);

    } catch (error) {
        res.status(500).json({ success: false })

    }
})

router.post('/create', async (req, res) => {

    let productWeight = new ProductWeight({
        productWeight: req.body.productWeight
    })

    if (!productWeight) {
        return res.status(500).json({
            error: err,
            success: false
        })
    }

    productWeight = await productWeight.save()

    return res.status(201).json(productWeight)
})

router.get('/:id', async (req, res) => {

    const productWeight = await ProductWeight.findById(req.params.id)

    if (!productWeight) {
        return res.status(500).json({ message: 'The product weight with the given ID was not found' })
    }

    return res.status(200).send(productWeight)
})

router.delete('/:id', async (req, res) => {

    const deletedproductWeight = await ProductWeight.findByIdAndDelete(req.params.id)

    if (!deletedproductWeight) {
        return res.status(404).json({
            message: 'product weight not found!',
            success: false
        })
    }

    return res.status(200).json({
        success: true,
        message: 'product weight Deleted!'
    })
})

router.put('/:id', async (req, res) => {

    const productWeight = await ProductWeight.findByIdAndUpdate(
        req.params.id,
        {
            productWeight: req.body.productWeight
        },
        { new: true }
    )

    if (!productWeight) {
        return res.status(500).json({
            message: 'product weight cannot be updated',
            success: false
        })
    }

    return res.send(productWeight);
})

export default router;  