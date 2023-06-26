import { Router } from 'express';
const router = Router()
import paymentController from '../controllers/Payment';

router.get('/', paymentController.fetch) ///payments?limit=10&skip=0
router.get('/:id', paymentController.detail)
router.post('/', paymentController.create)
router.put('/:id', paymentController.update)
router.delete('/:id', paymentController.delete)

export default router