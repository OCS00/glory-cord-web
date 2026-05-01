// Dosya: src/models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    color: { type: String, required: true },
    tag: { type: String }, // Opsiyonel olduğu için required koymadık
    image: { type: String, required: true }
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;