import mongoose, { Document, Schema } from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  // Other category fields as needed
});

const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;
