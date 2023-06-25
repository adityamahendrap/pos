import { Router } from 'express';
import authController from '../controllers/auth.controller';

const router = Router()

router.post('/login', authController.login)
router.post('/register', authController.register)
router.post('/verify-token', authController.verifyToken)
router.get('/verify-email/:id', authController.verifyEmail)
router.put('/change-password', authController.changePassword)
router.put('/forgot-password', authController.forgotPassword)

export default router