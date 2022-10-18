import express from 'express';
import {
    authUser,
    getUserProfile,
    getUsers,
    resisterUser,
    updateUserProfile,
    deleteUser,
    getUserById,
    updateUserById
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/login', authUser)
router.route('/').post(resisterUser)
    .get(protect, admin, getUsers)
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)
router.route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUserById)



export default router