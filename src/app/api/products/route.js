// Dosya: src/app/api/products/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Product from '@/models/Product';

// Dosya: src/app/api/products/route.js içindeki GET metodu

// 1. ÜRÜNLERİ GETİR (ARAMA VE FİLTRELEME DESTEKLİ)
export async function GET(request) {
  try {
    await connectToDatabase();
    
    // URL'nin sonundaki soru işaretli parametreleri yakalıyoruz (Örn: ?search=kordon&category=Metal Uç)
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';

    // Veritabanına soracağımız soruyu (Query) hazırlıyoruz
    let query = {};

    // Eğer arama kutusu doluysa:
    if (search) {
      // $regex: İçinde bu kelime geçenleri bulur. $options: 'i' : Büyük/küçük harf duyarlılığını kaldırır.
      query.name = { $regex: search, $options: 'i' }; 
    }

    // Eğer bir kategori seçilmişse ve bu 'Tümü' değilse:
    if (category && category !== 'Tümü') {
      query.category = category;
    }

    // Hazırladığımız query (sorgu) ile ürünleri bul
    const products = await Product.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, products: products });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Ürünler getirilemedi.' }, { status: 500 });
  }
}

// 2. YENİ ÜRÜN EKLE
export async function POST(request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    
    const newProduct = await Product.create(body);
    
    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}