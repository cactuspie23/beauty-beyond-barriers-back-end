import mongoose from 'mongoose'

const Schema = mongoose.Schema

const cartSchema = new Schema({
  customer:{ type:Schema.Types.ObjectId, ref: 'Profile' },
  products: [{
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true, min: 1, default: 1 },
  }],
},{
  timestamps: true,
})

const Cart = mongoose.model('Cart', cartSchema)

export { Cart }
