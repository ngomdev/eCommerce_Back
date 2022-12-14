import User from '../models/userModels.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';

// @ desc Auth user & get token
// @ route POST/api/users/login
// @ access Public

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (user && (await user.comparePassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })

    } else {
        res.status(401)
        throw new Error('Invalide email or password !')
    }
})


// @ desc get user profile
// @ route POST/api/users
// @ access Public

const resisterUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password
    })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)

        })
    }
    else {
        res.status(400)
        throw new Errow('Invalid user data')

    }

})

// @ desc GET user profile
// @ route GET/api/users/profile
// @ access Private

const getUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin

        })

    } else {
        res.status(404)
        throw new Error('User not found !')
    }
    res.send("Success")
})



// @ desc Update user profile
// @ route PUT /api/users/profile
// @ access Private


const updateUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if (req.body.password) {
            user.password = req.body.password
        }


        const updatedUser = await user.save()

        res.status(201).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)

        })

    } else {
        res.status(404)
        throw new Error('User not found !')
    }
    res.send("Success")
})

// @ desc GET all user 
// @ route GET/api/users
// @ access Private/Admin

const getUsers = asyncHandler(async (req, res) => {

    const users = await User.find({})
    res.send(users)
})


// @ desc GET a single user 
// @ route GET/api/users/:id
// @ access Private/Admin

const getUserById = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id).select('-password')

    if (user) {
        res.send(user)
    } else {
        res.status(404)
        throw new Error('User not found !')
    }

})


// @ desc DELETE  user 
// @ route DELETE/api/users
// @ access Private/Admin

const deleteUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id)
    if (user) {
        await user.remove()
        res.json({
            message: 'User removed'
        })

    } else {
        res.status(404)
        throw new Error('User not found !')
    }

})

// @ desc Update user 
// @ route PUT /api/users/:id
// @ access Private/Admin


const updateUserById = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin || user.isAdmin

        if (req.body.password) {
            user.password = req.body.password
        }


        const updatedUser = await user.save()

        res.status(201).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,


        })

    } else {
        res.status(404)
        throw new Error('User not found !')
    }
    res.send("Success")
})


export {
    authUser,
    getUserProfile,
    resisterUser,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUserById

}