import express from 'express'
import { Productedges } from '../models/productEdges'


const router = express.Router()

// router.get('/', async (req, res) => {
//     try {
//         const productEdgesList = await Productedges.find()

//         if (!productEdgesList) {
//             return res.status(500).json({ success: false })
//         }
//         return res.status(200).json({
//             "ProductEdges": productEdgesList
//         });

//     } catch (error) {
//         return res.status(500).json({ success: false })
//     }
// })

// router.post('/create', async (req, res) => {

//     let productEdge = new Productedges({
//             edge: req.body.edge,
//             images: imagesArr,
//             productId: req.body.productId
//         })

//         productEdge = await productEdge.save();

//         if (!productEdge) {
//             res.status(500).json({
//                 error: err,
//                 success: false
//             })
//         }

//         return res.status(201).json(productEdge)
// })



router.post('/', async (req, res) => {
    try {
        const { productId, name, images } = req.body;

        const existingProductEdge = await Productedges.findOne({ productId, name });
        if (existingProductEdge) {
            return res.status(400).json({ message: 'Productedge with this name already exists for the given productId' });
        }

        // If no existing productedge is found, create a new one
        const newProductEdge = new Productedges({ productId, name, images });
        await newProductEdge.save();
        res.status(201).json(newProductEdge);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/:productId', async (req, res) => {
    try {
        const productEdge = await Productedges.find({ productId: req.params.productId });
        if (!productEdge.length) {
            return res.status(404).json({ message: 'Productedge not found for this productId' });
        }
        res.json(productEdge);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedProductEdge = await Productedges.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedProductEdge) {
            return res.status(404).json({ message: 'Productedge not found' });
        }
        res.json(updatedProductEdge);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE Productedge
router.delete('/:id', async (req, res) => {
    try {
        const deletedProductEdge = await Productedges.findByIdAndDelete(req.params.id);
        if (!deletedProductEdge) {
            return res.status(404).json({ message: 'Productedge not found' });
        }
        res.json({ message: 'Productedge deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;   