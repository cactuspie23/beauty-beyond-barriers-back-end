import mongoose from 'mongoose'

const Schema = mongoose.Schema

const productSchema = new Schema({
  name: String,
  category: String,
  description: String,
  imgUrl: String,
  price: Number,
  stock: { type: Number, required: true, min: 1, default: 1 },
},{
  timestamps: true,
})

const Product = mongoose.model('Product', productSchema)

export { Product }
