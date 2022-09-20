import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

// @ desc Fetch all products
// @ route GET/api/products
// @ access Public

const getProducts = asyncHandler(async (req, res) => {

    const keyWord = req.query.keyWord ? {
        name: {
            $regex: req.query.keyWord,
            $options: 'i'

        }
    } : {}
    const products = await Product.find({ ...keyWord })

    res.json(products)

})
// @ desc Fetch single product
// @ route GET/api/products/:id
// @ access Public
const getProductById = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id)


    if (product) {
        res.json(product)
    } else {
        res.status(404).json({ message: 'Product not found !' })
    }


})

// @ desc Delete a  product
// @ route DELETE/api/products/:id
// @ access private/admin
const deleteProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id)


    if (product) {
        await product.remove()
        res.json({ message: 'Product removed !' })
    } else {
        res.status(404).json({ message: 'Product not found !' })
    }


})


// @ desc Update a  product
// @ route PUT/api/products/:id
// @ access private/admin
const updateProduct = asyncHandler(async (req, res) => {

    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
        numReviews } = req.body


    const product = await Product.findById(req.params.id)

    if (product) {

        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock
        product.numReviews = numReviews




        const updateProduct = await product.save()
        res.json(updateProduct)

    } else {
        res.status(404)
        throw new Error('Product not Found')
    }




})

// @ desc Create a  product
// @ route POST/api/products
// @ access private/admin
const createProduct = asyncHandler(async (req, res) => {

    const product = new Product({
        name: 'sample product',
        price: '0',
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'sample brand',
        category: 'sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'sample description'
    })


    const createdProduct = await product.save()
    res.status(201).json(createdProduct)


})







export { getProducts, getProductById, deleteProduct, updateProduct, createProduct }