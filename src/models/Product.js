// Dosya: src/models/Product.js
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Ürün adı zorunludur.'],
  },
  category: {
    type: String,
    required: [true, 'Kategori zorunludur (Örn: Metal Uçlu, Silikon vb.).'],
  },
  color: {
    type: String,
    required: [true, 'Renk belirtilmelidir.'],
  },
  tag: {
    type: String, // "ÇOK SATAN", "YENİ NESİL" gibi etiketler
  },
  image: {
    type: String,
    required: [true, 'Ürün fotoğrafı linki zorunludur.'],
  },
}, { timestamps: true }); // Ne zaman eklendiğini otomatik kaydeder

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);