import mongoose from "mongoose"

const reviewsShema = mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: String, required: true },
    comment: { type: String, required: true },
}, {
    timestamps: true
})

const productShema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'

    },
    name: {
        type: String,
        require: true

    },
    image: {
        type: String,
        require: true

    },
    brand: {
        type: String,
        require: true

    },
    category: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        require: true

    },
    rewiews: [reviewsShema],
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReview: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    },


}, {
    timestamps: true
})

const Product = mongoose.model('Product', productShema)

export default Product