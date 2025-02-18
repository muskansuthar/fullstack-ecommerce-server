import express from 'express'
import { Producttops } from '../models/productTops'


const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { productId, name, images } = req.body;

    // Check if ProductTop with the same productId and name already exists
    const existingProductTop = await Producttops.findOne({ productId, name });
    if (existingProductTop) {
      return res.status(400).json({ message: 'ProductTop with this name already exists for the given productId' });
    }

    // If no existing productTop is found, create a new one
    const newProductTop = new Producttops({ productId, name, images });
    await newProductTop.save();
    res.status(201).json(newProductTop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:productId', async (req, res) => {
  try {
    const productTop = await Producttops.find({ productId: req.params.productId });
    if (!productTop.length) {
      return res.status(404).json({ message: 'ProductTop not found for this productId' });
    }
    res.json(productTop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE ProductTop
router.put('/:id', async (req, res) => {
  try {
    const updatedProductTop = await Producttops.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProductTop) {
      return res.status(404).json({ message: 'ProductTop not found' });
    }
    res.json(updatedProductTop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE ProductTop
router.delete('/:id', async (req, res) => {
  try {
    const deletedProductTop = await Producttops.findByIdAndDelete(req.params.id);
    if (!deletedProductTop) {
      return res.status(404).json({ message: 'ProductTop not found' });
    }
    res.json({ message: 'ProductTop deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


export default router;   