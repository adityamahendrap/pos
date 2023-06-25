import { Router } from 'express';
const router = Router()

router.get('/') ///categories?limit=10&skip=0
router.get('/:id')
router.post('/')
router.put('/:id')
router.delete('/:id')

export default router