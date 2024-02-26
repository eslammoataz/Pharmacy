import mongoose, { Document, Schema } from 'mongoose';

const cartItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: {
    type: Number,
    default: 1,
  },
});

const cartSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [cartItemSchema],
});

const CartModel = mongoose.model('Cart', cartSchema);

module.exports = CartModel;
