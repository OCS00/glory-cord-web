// Dosya: src/app/api/products/route.js
import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Product from '../../../models/Product';

// VERİTABANINDAN ÜRÜNLERİ GETİRME (GET)
export async function GET() {
  try {
    await connectToDatabase();
    // En son eklenen en üstte çıksın diye createdAt: -1 yapıyoruz
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// VERİTABANINA YENİ ÜRÜN EKLEME (POST)
export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const newProduct = await Product.create(data);
    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}