import express from 'express'
import products from './data/products.js'
import dotenv from 'dotenv'
import connectDB from './data/config/db.js'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js';
import { notFound, errorHandler } from './middleware/erroMiddleware.js'

dotenv.config();
connectDB();
const app = express()

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))
app.get('/', (req, res) => {
    res.send('API is running...................')

})
// endpoint de tous les produits
app.use('/api/products', productRoutes)

app.use(notFound)

app.use(errorHandler)