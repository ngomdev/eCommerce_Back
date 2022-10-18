
import path from 'path'
import express from 'express'
import products from './data/products.js'
import dotenv from 'dotenv'
import connectDB from './data/config/db.js'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middleware/erroMiddleware.js'

dotenv.config();
connectDB();
const app = express()

app.use(express.json())

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))
app.get('/', (req, res) => {
    res.send('API is running...................')

})
// endpoint de tous les produits
app.use('/api/products', productRoutes)
//endpoint pour user et authentification
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>

    res.send(process.env.PAYPAL_CLIENT_ID)

)


const __dirname = path.resolve()

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)

app.use(errorHandler)
