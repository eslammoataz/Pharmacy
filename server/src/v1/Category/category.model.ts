import mongoose, { Document, Schema, Types } from 'mongoose';
import { IProduct } from '../Products/product.model';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  // Other category fields as needed
});

interface ICategory extends Document {
  name: string;
  products?: Types.ObjectId[];
}

const CategoryModel = mongoose.model('Category', categorySchema);

export { CategoryModel, ICategory };
