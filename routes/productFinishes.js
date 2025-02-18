import express from 'express'
import { Productfinishes } from '../models/productFinishes'


const router = express.Router()


router.post('/', async (req, res) => {
    try {
        const { productId, name, images } = req.body;

        const existingProductFinish = await Productfinishes.findOne({ productId, name });
        if (existingProductFinish) {
            return res.status(400).json({ message: 'ProductFinish with this name already exists for the given productId' });
        }

        const newProductFinish = new Productfinishes({ productId, name, images });
        await newProductFinish.save();
        res.status(201).json(newProductFinish);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/:productId', async (req, res) => {
    try {
        const productFinish = await Productfinishes.find({ productId: req.params.productId });
        if (!productFinish.length) {
            return res.status(404).json({ message: 'ProductFinish not found for this productId' });
        }
        res.json(productFinish);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedProductFinish = await Productfinishes.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedProductFinish) {
            return res.status(404).json({ message: 'ProductFinish not found' });
        }
        res.json(updatedProductFinish);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedProductFinish = await Productfinishes.findByIdAndDelete(req.params.id);
        if (!deletedProductFinish) {
            return res.status(404).json({ message: 'ProductFinish not found' });
        }
        res.json({ message: 'ProductFinish deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;   