import mongoose, { Document, Schema, Types } from 'mongoose';
import { IUser } from '../users/user.model';

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

interface ICartItem extends Document {
  product: Types.ObjectId;
  quantity: number;
}

interface ICart extends Document {
  customer: Types.ObjectId | IUser;
  items: ICartItem[];
}

const CartModel = mongoose.model('Cart', cartSchema);

export { ICartItem, ICart, CartModel };
