// Dosya: src/app/api/products/[id]/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Product from '@/models/Product';

// 🌟 YENİ: Sadece 1 ürünü ID'sine göre getiren metod
export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    
    // URL'den ID'yi alıyoruz
    const { id } = await params;
    
    // Veritabanında bu ID'ye sahip ürünü buluyoruz
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ success: false, error: 'Ürün bulunamadı.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Ürün getirilemedi.' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const body = await request.json();
    const updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!updatedProduct) {
      return NextResponse.json({ success: false, error: 'Ürün bulunamadı.' }, { status: 404 });
    }
    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return NextResponse.json({ success: false, error: 'Ürün bulunamadı.' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Ürün silindi.' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Silme hatası.' }, { status: 500 });
  }
}