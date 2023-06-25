import { Router } from 'express';
const router = Router()

router.get('/') ///products?limit=10&skip=0
router.get('/:id')
router.post('/')
router.put('/:id')
router.delete('/:id')

export default router