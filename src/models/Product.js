// Dosya: src/models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true }, // 🌟 DİKKAT: 'color' silindi, yerine 'description' eklendi
    code: { type: String },
    tag: { type: String },
    image: { type: String, required: true }
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;