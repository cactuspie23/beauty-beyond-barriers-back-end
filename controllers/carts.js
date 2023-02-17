import { Product } from "../models/product.js"
import { Cart } from "../models/cart.js"
import e from "cors"

const index = async (req, res) => {
  try {
    const carts = await Cart.find({})
      .sort({ createdAt: 'asc' })
    if (carts) {
      res.json(carts)
    } else {
      res.json(null)
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

const create = async (req, res) => {
  req.body.customer = req.user.profile
  const { customer, productId, quantity } = req.body
  try {
    let cart = await Cart.findOne({ customer: customer })
    let product = await Product.findOne({ _id: productId })
    if (!product) {
      res.status(404).send('Item not found!')
    }else{
      if (cart) {
        let productIndex = cart.products.findIndex(p => p.productId == productId)
        if (productIndex > -1) {
          let productItem = cart.products[productIndex]
          productItem.quantity += quantity
        } else {
          cart.products.push({ productId, quantity })
        }
        cart = await cart.save()
        res.status(201).json(cart)
      } else {
        const newCart = await Cart.create({
          customer,
          products: [{ productId, quantity }]
        })
        res.status(201).json(newCart)
      }
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
    let cart = await Cart.findOne({ userId })
    let productIndex = cart.products.findIndex(p => p.productId == productId)
    if (productIndex > -1) {
      cart.products.splice(productIndex, 1)
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