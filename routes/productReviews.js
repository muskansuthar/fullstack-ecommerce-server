import express from 'express'
import { ProductReviews } from '../models/productReviews.js';


const router = express.Router()

router.get('/', async (req, res) => {

    let reviews=[];

    try {

        if (req.query.productId!==undefined && req.query.productId!==null && req.query.productId!=="") {
            reviews = await ProductReviews.find({productId: req.query.productId})
        }else{
            reviews = await ProductReviews.find()
        }

        if(!reviews){
            return res.status(500).json({success:false})
        }

        return res.status(200).json(reviews);
        
    } catch (error) {
        return res.status(500).json({ success: false })

    }
})

router.get('/:id', async (req, res) => {

        const review = await ProductReviews.findById(req.params.id)

        if(!review){
            return res.status(500).json({message: "The review with the given ID was not found"})
        }

        return res.status(200).json(review);
})

router.post('/add', async (req, res) => {

        let review = new ProductReviews({
            customerId: req.body.customerId,
            customerName: req.body.customerName,
            review: req.body.review,
            customerRating: req.body.customerRating,
            productId: req.body.productId
        })

        if (!review) {
            return res.status(500).json({
                error: err,
                success: false
            })
        }

        review = await review.save()

        return res.status(201).json(review)

})

export default router;   