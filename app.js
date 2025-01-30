import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors';
import 'dotenv/config';
import authJwt from './helper/jwt.js';

//Routes
import categoryRoutes from './routes/categories.js';
import productRoutes from './routes/product.js';
import productWeightRoutes from './routes/productWeight.js';
import productRamsRoutes from './routes/productRams.js';
import productSizeRoutes from './routes/productSize.js';
import userRoutes from './routes/user.js';
import cartRoutes from './routes/cart.js';
import myListRoutes from './routes/myList.js';
import productReviewsRoutes from './routes/productReviews.js';
import ordersRoutes from './routes/orders.js';
import homeBannerRoutes from './routes/homeBanner.js';
import searchRoutes from './routes/search.js';

const app = express()     

app.use(cors())
app.options('*', cors())

//middleware
app.use(bodyParser.json())
app.use(express.json())
app.use(authJwt())

app.use('/uploads', express.static("uploads"))
app.use('/api/user', userRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/products', productRoutes)
app.use('/api/productWeight', productWeightRoutes)
app.use('/api/productRAMS', productRamsRoutes)  
app.use('/api/productSize', productSizeRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/my-list', myListRoutes)
app.use('/api/productReviews', productReviewsRoutes)
app.use('/api/orders', ordersRoutes)
app.use('/api/homeBanner', homeBannerRoutes)   
app.use('/api/search', searchRoutes)

//Database
mongoose.connect(process.env.CONNECTION_STRING).then(() => {
    console.log("Database Connection is ready...")  
    //server
    app.listen(process.env.PORT, () => {
        console.log(`Server is running http://localhost:${process.env.PORT}`)
    })
}).catch((err) => {  
    console.log(err) 
})

