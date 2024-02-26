import mongoose, { Document, Schema } from 'mongoose';

const orderItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed'],
      default: 'pending',
    },
    shippingAddress: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;
