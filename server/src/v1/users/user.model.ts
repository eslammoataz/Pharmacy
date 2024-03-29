import mongoose, { Document, Schema } from 'mongoose';

// Define User schema
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'customer'],
      default: 'customer',
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: 'Cart',
    },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    token: String,
    passwordResetExpire: Date,
  },
  {
    timestamps: true,
  }
);

// Define User model interface
interface IUser extends Document {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  password: string;
  token?: string;
  passwordResetExpire?: Date;
}

// Define and export User model
const UserModel = mongoose.model<IUser>('User', UserSchema);

export { UserModel, IUser };
