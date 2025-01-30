import express from 'express'
import { Cart } from '../models/cart.js';


const router = express.Router()

router.get('/', async (req, res) => {

    try {

        const cartList = await Cart.find(req.query)

        if (!cartList) {
            return res.status(500).json({ success: false })
        }

        return res.status(200).json(cartList);
    } catch (error) {
        return res.status(500).json({ success: false })

    }
})

router.post('/add', async (req, res) => {

    const cartItem = await Cart.find({ productId: req.body.productId })

    if (cartItem.length===0) {

        let cartList = new Cart({
            productTitle: req.body.productTitle,
            image: req.body.image,
            rating: req.body.rating,
            price: req.body.price,
            quantity: req.body.quantity,
            subTotal: req.body.subTotal,
            productId: req.body.productId,
            userId: req.body.userId
        })
        if (!cartList) {
            return res.status(500).json({
                error: err,
                success: false
            })
        }

        cartList = await cartList.save()

        return res.status(201).json(cartList)
    } else {
        return res.status(401).json({ status: false, msg: "Product already added in the cart" })
    }

})

router.get('/:id', async (req, res) => {

    const cartitem = await Cart.findById(req.params.id)

    if(!cartitem){
        return res.status(500).json({message: "The cart item with the given ID was not found"})
    }

    return res.status(200).json(cartitem);
})


router.delete('/:id', async (req, res) => {

    const cartItem = await Cart.findById(req.params.id)

    if (!cartItem) {
        return res.status(404).json({ msg: "The cart item given id is not found!" })
    }

    const deletedCart = await Cart.findByIdAndDelete(req.params.id)

    if (!deletedCart) {
        return res.status(404).json({
            message: 'Cart item not found!',
            success: false
        })
    }

    return res.status(200).json({
        success: true,
        message: 'Cart item Deleted!'
    })
})

router.put('/:id', async (req, res) => {

    const cartList = await Cart.findByIdAndUpdate(
        req.params.id,
        {
            productTitle: req.body.productTitle,
            image: req.body.image,
            rating: req.body.rating,
            price: req.body.price,
            quantity: req.body.quantity,
            subTotal: req.body.subTotal,
            productId: req.body.productId,
            userId: req.body.userId
        },
        { new: true }
    )

    if (!cartList) {
        return res.status(500).json({
            message: 'Cart Item cannot be updated',
            success: false
        })
    }

    return res.send(cartList);
})

export default router;   