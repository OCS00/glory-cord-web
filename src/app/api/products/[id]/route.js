// Dosya: src/app/api/products/[id]/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Product from '@/models/Product';

// ÜRÜN SİL
export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    
    // URL'deki [id] kısmını alıyoruz
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