import mongoose, { Document, Schema } from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  image: {
    type: String,
  },
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
