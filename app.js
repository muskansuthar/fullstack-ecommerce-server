import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors';
import 'dotenv/config';
import authJwt from './helper/jwt.js';

//Routes
import categoryRoutes from './routes/categories.js';
import productRoutes from './routes/product.js';
import userRoutes from './routes/user.js';
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

