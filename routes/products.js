import { Router } from 'express'
import * as productsCtrl from '../controllers/products.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========== Public Routes ===========


// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.post('/', checkAuth, productsCtrl.create)
router.get('/', checkAuth, productsCtrl.index)

export { router }