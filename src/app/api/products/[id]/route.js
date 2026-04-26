// Dosya: src/app/api/products/[id]/route.js
import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import Product from '../../../../models/Product';

// ÜRÜN SİLME İŞLEMİ (DELETE)
export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    
    // YENİ NEXT.JS SÜRÜMÜ GÜNCELLEMESİ: params'ı await ile çözüyoruz!
    const resolvedParams = await params;
    const id = resolvedParams.id;
    
    const deletedProduct = await Product.findByIdAndDelete(id);
    
    if (!deletedProduct) {
      return NextResponse.json({ success: false, error: 'Ürün bulunamadı' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, message: 'Ürün başarıyla silindi' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}