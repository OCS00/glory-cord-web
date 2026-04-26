// Dosya: src/lib/mongodb.js
import mongoose from 'mongoose';

// ŞİFREYİ DİREKT BURAYA YAZIYORUZ (Tırnak işaretleri duracak, sadece ŞİFRENİ_YAZ yazan yeri kendi şifrenle değiştir)
const MONGODB_URI = "mongodb+srv://gloryadmin:glorycord0@cluster0.4bs9iie.mongodb.net/glorycord?appName=Cluster0";

// Artık şifre direkt yukarıda olduğu için hata verme kısmını kapattık!
// if (!MONGODB_URI) {
//   throw new Error('Lütfen .env.local dosyasina MONGODB_URI ekleyin!');
// }

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("🔥 Veritabanı Bağlantısı Başarılı!");
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;