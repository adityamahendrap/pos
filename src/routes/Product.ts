import { Router } from 'express';
const router = Router()
import productController from '../controllers/Product';

router.get('/', productController.fetch) ///products?limit=10&skip=0
router.get('/:id', productController.detail)
router.post('/', productController.create)
router.put('/:id', productController.update)
router.delete('/:id', productController.delete)

export default router
