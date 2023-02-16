import { Router } from 'express'
import * as productsCtrl from '../controllers/products.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========== Public Routes ===========
router.get('/', productsCtrl.index)
router.get('/:id', productsCtrl.show)


// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.post('/', checkAuth, productsCtrl.create)
router.put('/:id', checkAuth, productsCtrl.update)
router.delete('/:id', checkAuth, productsCtrl.deleteProduct)

export { router }