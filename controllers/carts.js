import { Product } from "../models/product.js"
import { Cart } from "../models/cart.js"

const index = async (req, res) => {
  const userId = req.params.id
  try {
    const cart = await Cart.findOne({userId})
      .sort({ createdAt: 'asc' })
    if(cart && cart.products.length>0){
      res.json(cart)
    } else {
      res.json(null)
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

const create = async (req, res) => {
  const userId = req.params.id
  const { productId, quantity } = req.body
  try {
    let cart = await Cart.findOne({userId})
    let product = await Product.findOne({_id: productId})
    if(!product){
      res.status(404).send('Item not found!')
    }

    if(cart){
      let productIndex = cart.products.findIndex(p => p.productId == productId)
      if(productIndex > -1){
        let productItem = cart.products[productIndex]
        productIndex.quantity += quantity
        cart.products[productIndex] = productItem
      } else {
        cart.products.push({ productId, quantity })
      }
      cart = await cart.save()
      res.status(201).json(cart)
    } else {
      const newCart = await Cart.create({
        userId,
        products: [{ productId, quantity }]
      })
      res.status(201).json(newCart)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const deleteCart = async (req, res) => {
  const userId = req.params.userId
  const productId = req.params.productId
  try {
    let cart = await Cart.findOne({userId})
    let productIndex = cart.products.findIndex(p => p.productId == productId)
    if(productIndex > -1){
      cart.products.splice(productIndex,1)
    }
    cart = await cart.save()
    res.status(201).json(cart)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export {
  index,
  create,
  deleteCart
}