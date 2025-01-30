import express from 'express'
import { ProductRams } from '../models/productRAMS.js'


const router = express.Router()

router.get('/', async (req, res) => {

    try {
        const productRamsList = await ProductRams.find()

        if (!productRamsList) {
            return res.status(500).json({ success: false })
        }

        return res.status(200).json(productRamsList);

    } catch (error) {
        res.status(500).json({ success: false })  

    }
})

router.post('/create', async (req, res) => {   

    let productRams = new ProductRams({
        productRam: req.body.productRam
    })

    if (!productRams) {
        return res.status(500).json({
            error: err,
            success: false
        })
    }

    productRams = await productRams.save()

    return res.status(201).json(productRams)
})

router.get('/:id', async (req, res) => {

    const productRams = await ProductRams.findById(req.params.id)

    if (!productRams) {
        return res.status(500).json({ message: 'The product Rams with the given ID was not found' })
    }

    return res.status(200).send(productRams)
})

router.delete('/:id', async (req, res) => {

    const deletedproductRams = await ProductRams.findByIdAndDelete(req.params.id)

    if (!deletedproductRams) {
        return res.status(404).json({
            message: 'product Rams not found!',
            success: false
        })
    }

    return res.status(200).json({
        success: true,
        message: 'product Rams Deleted!'
    })
})

router.put('/:id', async (req, res) => {

    const productRams = await ProductRams.findByIdAndUpdate(
        req.params.id,
        {
            productRam: req.body.productRam
        },
        { new: true }
    )

    if (!productRams) {
        return res.status(500).json({
            message: 'product Rams cannot be updated',
            success: false
        })
    }

    return res.send(productRams);
})

export default router;  