import mongoose, { Document, Schema, Types } from 'mongoose';
import { ICategory } from '../Category/category.model';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Category',
  },
  image: {
    type: String,
  },
});

interface IProduct extends Document {
  name: string;
  price: number;
  description?: string;
  category: Types.ObjectId;
}

const ProductModel = mongoose.model('Product', productSchema);

export { ProductModel, IProduct };
