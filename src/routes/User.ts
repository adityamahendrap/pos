import { Router } from 'express';
const router = Router()
import userController from '../controllers/User';

router.get('/', userController.fetch)
router.get('/:id', userController.detail)
router.put('/:id', userController.update)
router.delete('/:id', userController.delete)

export default router