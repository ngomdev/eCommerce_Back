import jwt from "jsonwebtoken";
import User from "../models/userModels.js";
import asyncHandler from "express-async-handler";


const protect = asyncHandler(async (req, res, next) => {
    let token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')

    ) {
        try {

            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')

            console.log(decoded)
            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authoized token fail')

        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized , no token')
    }

    //console.log(req.headers.authorization)


})

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()

    } else {
        res.status(401)
        throw new Error('Not authorized as an admin')
    }

}

export { protect, admin }