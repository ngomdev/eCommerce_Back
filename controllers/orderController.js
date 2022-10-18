import Order from '../models/orderModel.js';
import asyncHandler from 'express-async-handler';


// @ desc Create new Order
// @ route POST/api/orders
// @ access Private

const addOrderItems = asyncHandler(async (req, res) => {


    const { orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice } = req.body


    if (orderItems && orderItems.lenght === 0) {
        res.status(400)
        throw new Error('No order Items')
        return

    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice


        })
        const CreatedOrder = await order.save()
        res.status(201).json(CreatedOrder)

    }


})

// @ desc GET orders BY ID
// @ route GET/api/orders/:id
// @ access Private

const getOrderById = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id).populate('user')

    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Not found !')

    }
})




// @ desc update order to paid
// @ route GET/api/orders/:id/pay
// @ access Private

const updateOrderToPaid = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id)
    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }
    } else {
        res.status(404)
        throw new Error('Not found !')

    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)

})


// @ desc GET logged in users orders
// @ route GET/api/orders/myorders
// @ access Private

const getMyOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find({ user: req.user._id })

    res.json(orders)

})

// @ desc GET all  orders
// @ route GET/api/orders
// @ access Private/admin
const getOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find({}).populate('user')

    res.json(orders)

})
export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders }