import { Router } from 'express'
import * as cartsCtrl from '../controllers/carts.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========== Public Routes ===========


// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.get('/', checkAuth, cartsCtrl.index)
router.post('/', checkAuth, cartsCtrl.create)
router.delete('/:id', checkAuth, cartsCtrl.deleteCart)

export { router }