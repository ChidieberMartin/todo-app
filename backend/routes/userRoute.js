import express from 'express'
import { registerUser, loginUser, getUserProfile, logoutUser } from '../controllers/userController.js'
import { forgotPassword, resetPassword } from '../controllers/authController.js'
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/profile", protect, getUserProfile)
router.post("/logout", logoutUser)
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router

